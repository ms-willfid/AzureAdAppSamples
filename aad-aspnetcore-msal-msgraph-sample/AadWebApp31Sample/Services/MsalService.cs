using AadWebApp31Sample.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AadWebApp31Sample.Services
{
    public interface IMsalService
    {
        public Task<string> GetTokenUsingAuthorizationCode(string code);
        public Task<string> GetToken(string scope);
    }


    public class MsalService : IMsalService
    {
        private IConfidentialClientApplication client;

        private IConfiguration Configuration { get; }
        private IHttpContextAccessor UserHttpContext { get; }


        string ClientId;
        string Authority;
        string ClientSecret;
        string RedirectUri;

        public MsalService(IConfiguration Configuration, IHttpContextAccessor UserHttpContext)
        {
            this.Configuration = Configuration;
            this.UserHttpContext = UserHttpContext;

            ClientId = Configuration["AzureAd:ClientId"];
            Authority = $"{Configuration["AzureAd:Instance"]}{Configuration["AzureAd:TenantId"]}";
            ClientSecret = Configuration["AzureAd:ClientSecret"];

            var CallbackPath = Configuration["AzureAd:CallbackPath"];

            RedirectUri = $"{UserHttpContext.HttpContext.Request.Scheme}://{UserHttpContext.HttpContext.Request.Host}{CallbackPath}";

            client = ConfidentialClientApplicationBuilder.Create(ClientId)
                .WithAuthority(Authority)
                .WithRedirectUri(RedirectUri)
                .WithClientSecret(ClientSecret)
                .Build();
        }

        public async Task<string> GetTokenUsingAuthorizationCode(string code)
        {
            string[] scopes = { "User.Read" };
            var result = await client.AcquireTokenByAuthorizationCode(scopes, code).ExecuteAsync().ConfigureAwait(false);
            return result.AccessToken;
        }

        public async Task<string> GetToken(string scope)
        {
            var scopes = scope.Split(" ");
            
            var AccountId = UserHttpContext.HttpContext.User.Claims.Where(c => c.Type == CustomClaimTypes.ObjectId).FirstOrDefault().Value;
            var TenantId = UserHttpContext.HttpContext.User.Claims.Where(c => c.Type == CustomClaimTypes.TenantId).FirstOrDefault().Value;
            
            var account = await client.GetAccountAsync($"{AccountId}.{TenantId}");
            var result = await client.AcquireTokenSilent(scopes, account).ExecuteAsync().ConfigureAwait(false);
            return result.AccessToken;
        }

    }
}
