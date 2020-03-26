using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AadWebApp31Sample.Models
{
    public class CustomClaimTypes
    {
        public static string ObjectId = "http://schemas.microsoft.com/identity/claims/objectidentifier";
        public static string UserPrincipalName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn";
        public static string TenantId = "http://schemas.microsoft.com/identity/claims/tenantid";
    }
}
