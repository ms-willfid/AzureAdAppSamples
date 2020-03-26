using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using AadWebApp31Sample.Models;
using AadWebApp31Sample.Services;

namespace AadWebApp31Sample.Controllers
{

    [Authorize]
    public class HomeController : Controller
    {
        private IMSGraphService _msGraphClient;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger,  IMSGraphService MSGraphServiceClient)
        {
            this._logger = logger;
            this._msGraphClient = MSGraphServiceClient;
        }

        public async Task<IActionResult> Index()
        {
            var User = await _msGraphClient.GetUserAsync();
 
            var ExtProp = User.OnPremisesExtensionAttributes.ExtensionAttribute1;

            ViewData["ExtProp"] = ExtProp;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [AllowAnonymous]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
