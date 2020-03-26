using AadWebApp31Sample.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AadWebApp31Sample.Services
{
    public interface IMSGraphService
    {
        public Task<User> GetUserAsync();
    }


    public class MSGraphService : IMSGraphService
    {
        // the Graph SDK's GraphServiceClient
        private GraphServiceClient graphServiceClient;

        // Dependency Injections
        private IConfiguration configuration;
        private IMsalService MsalServiceClient;
        private IHttpContextAccessor UserHttpContext;

        public MSGraphService(IConfiguration configuration, IMsalService msalService, IHttpContextAccessor UserHttpContext)
        {
            this.configuration = configuration;
            this.MsalServiceClient = msalService;
            this.UserHttpContext = UserHttpContext;
        }

        /// <summary>
        /// Gets the users in a tenant.
        /// </summary>
        /// <param name="accessToken">The access token for MS Graph.</param>
        /// <returns>
        /// A list of users
        /// </returns>
        public async Task<User> GetUserAsync()
        {
            try
            {
                PrepareAuthenticatedClient(await MsalServiceClient.GetToken("User.Read"));

                // Using Graph SDK to get users, filtering by active ones and returning just id and userPrincipalName field

                var UserObjectId = UserHttpContext.HttpContext.User.Claims.Where(c => c.Type == CustomClaimTypes.ObjectId).FirstOrDefault().Value;

                var user = await graphServiceClient.Me.Request()
                    .Select("id, userPrincipalName, OnPremisesExtensionAttributes")
                    .GetAsync();

                return user;
            }
            catch (ServiceException e)
            {
                Debug.WriteLine("We could not retrieve the user's list: " + $"{e}");
                return null;
            }

            
        }

        /// <summary>
        /// Prepares the authenticated client.
        /// </summary>
        /// <param name="accessToken">The access token.</param>
        private void PrepareAuthenticatedClient(string accessToken)
        {
            try
            {
                /***
                //Microsoft Azure AD Graph API endpoint,
                'https://graph.microsoft.com'   Microsoft Graph global service
                'https://graph.microsoft.us' Microsoft Graph for US Government
                'https://graph.microsoft.de' Microsoft Graph Germany
                'https://microsoftgraph.chinacloudapi.cn' Microsoft Graph China
                 ***/

                string graphEndpoint = configuration.GetValue<string>("MSGraph:BaseUrl");
                graphServiceClient = new GraphServiceClient(graphEndpoint,
                                                                     new DelegateAuthenticationProvider(
                                                                         async (requestMessage) =>
                                                                         {
                                                                             await Task.Run(() =>
                                                                             {
                                                                                 requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", accessToken);
                                                                             });
                                                                         }));
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Could not create a graph client {ex}");
            }
        }
    }
}
