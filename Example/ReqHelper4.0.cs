using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace System.Web
{
    /// <summary>
    /// 访问请求上下文参数 静态类
    /// </summary>
    public static class ReqHelper
    {
        public static HttpRequest req
        {
            get { return HttpContext.Current.Request; }
        }
        public static HttpResponse resp
        {
            get { return HttpContext.Current.Response; }
        }

        #region 获取String类型的值
        /// <summary>
        /// 获取QueryString参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>字符串，结果值</returns>
        public static string GetStringQuery(string key)
        {
            string val = req.QueryString.Get(key);
            if (string.IsNullOrEmpty(val))
                return "";
            return val;
        }
        /// <summary>
        /// 获取Form参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>字符串，结果值</returns>
        public static string GetStringForm(string key)
        {
            string val = req.Form.Get(key);
            if (string.IsNullOrEmpty(val))
                return "";
            return val;
        }
        /// <summary>
        /// 获取RouteData参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>值</returns>
        public static string GetStringRoute(string key)
        {
            string val = GetRouteValue(key) as string;
            if (string.IsNullOrEmpty(val))
                return "";
            return val;
        }

        /// <summary>
        /// 获取请求参数，先检测RouteData，再检索Form，再检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>字符串结果</returns>
        public static string GetString(string key)
        {
            string result = GetStringRoute(key);
            if (result != "")
                return result;
            result = GetStringForm(key);
            if (result != "")
                return result;
            result = GetStringQuery(key);
            return result;
        }
        /// <summary>
        /// 获取请求参数，先检索Form，在检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <param name="defVal">默认值</param>
        /// <returns>字符串结果</returns>
        public static string GetString(string key, string defVal)
        {
            string result = GetString(key);
            if (result == "")
                return defVal;
            return result;
        }
        #endregion


        #region 获取Int类型的值
        /// <summary>
        /// 获取QueryString参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空int类型</returns>
        public static int? GetIntQuery(string key)
        {
            int result = 0;
            if (int.TryParse(GetStringQuery(key), out result))
            {
                return result;
            }
            return null;
        }
        /// <summary>
        /// 获取Form参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空int类型</returns>
        public static int? GetIntForm(string key)
        {
            int result = 0;
            if (int.TryParse(GetStringForm(key), out result))
            {
                return result;
            }
            return null;
        }
        /// <summary>
        /// 获取RouteData参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>值</returns>
        public static int? GetIntRoute(string key)
        {
            string val = GetStringRoute(key);
            int result;
            if (int.TryParse(val, out result))
            {
                return result;
            }
            return null;
        }


        /// <summary>
        /// 获取请求参数，先检索RouteData,再检索Form，再检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空int类型</returns>
        public static int? GetInt(string key)
        {
            int? result = GetIntRoute(key);
            if (result != null)
                return result;
            result = GetIntForm(key);
            if (result != null)
                return result.Value;
            result = GetIntQuery(key);
            return result;
        }
        /// <summary>
        /// 获取请求参数，先检索Form，在检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <param name="defVal">默认值</param>
        /// <returns>int类型</returns>
        public static int GetInt(string key, int defVal)
        {
            int? result = GetInt(key);
            if (result == null)
                return defVal;
            return result.Value;
        }
        #endregion


        #region 获取DateTime类型
        /// <summary>
        /// 获取QueryString参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空DateTime类型</returns>
        public static DateTime? GetDateTimeQuery(string key)
        {
            DateTime date;
            if (DateTime.TryParse(GetStringQuery(key), out date))
            {
                return date;
            }
            return null;
        }
        /// <summary>
        /// 获取Form参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空DateTime类型</returns>
        public static DateTime? GetDateTimeForm(string key)
        {
            DateTime date;
            if (DateTime.TryParse(GetStringForm(key), out date))
            {
                return date;
            }
            return null;
        }
        /// <summary>
        /// 获取RouteData数据
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static DateTime? GetDateTimeRoute(string key)
        {
            string val = GetStringRoute(key);
            DateTime result;
            if (DateTime.TryParse(val, out result))
            {
                return result;
            }
            return null;
        }

        /// <summary>
        /// 获取请求参数，先检索Form，在检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空DateTime类型</returns>
        public static DateTime? GetDateTime(string key)
        {
            DateTime? date = GetDateTimeRoute(key);
            if (date != null)
                return date;
            date = GetDateTimeForm(key);
            if (date != null)
                return date.Value;
            date = GetDateTimeQuery(key);
            return date;
        }
        /// <summary>
        /// 获取请求参数，先检索Form，在检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <param name="defVal">默认值</param>
        /// <returns>DateTime类型</returns>
        public static DateTime GetDateTime(string key, DateTime defVal)
        {
            DateTime? date = GetDateTime(key);
            if (date == null)
                return defVal;
            return date.Value;
        }
        #endregion


        #region 获取Decimal类型的值
        /// <summary>
        /// 获取QueryString参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空int类型</returns>
        public static decimal? GetDecimalQuery(string key)
        {
            decimal result = 0;
            if (decimal.TryParse(GetStringQuery(key), out result))
            {
                return result;
            }
            return null;
        }
        /// <summary>
        /// 获取Form参数
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空int类型</returns>
        public static decimal? GetDecimalForm(string key)
        {
            decimal result = 0;
            if (decimal.TryParse(GetStringForm(key), out result))
            {
                return result;
            }
            return null;
        }
        /// <summary>
        /// 获取RouteData参数
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static decimal? GetDecimalRoute(string key)
        {
            string val = GetStringRoute(key);
            decimal result;
            if (decimal.TryParse(val, out result))
            {
                return result;
            }
            return null;
        }


        /// <summary>
        /// 获取请求参数，先检索Decimal,先检索Form，在检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <returns>可空int类型</returns>
        public static decimal? GetDecimal(string key)
        {
            decimal? result = GetDecimalRoute(key);
            if (result != null)
                return result;
            result = GetDecimalForm(key);
            if (result != null)
                return result.Value;
            result = GetDecimalQuery(key);
            return result;
        }
        /// <summary>
        /// 获取请求参数，先检索Form，在检索QueryString
        /// </summary>
        /// <param name="key">键</param>
        /// <param name="defVal">默认值</param>
        /// <returns>int类型</returns>
        public static decimal GetDecimal(string key, decimal defVal)
        {
            decimal? result = GetDecimal(key);
            if (result == null)
                return defVal;
            return result.Value;
        }
        #endregion


        #region 获取路由参数
        /// <summary>
        /// 获取路由参数
        /// </summary>
        /// <param name="key">键值</param>
        /// <returns>object数据</returns>
        public static object GetRouteValue(string key)
        {
            return req.RequestContext.RouteData.Values[key];
        }
        /// <summary>
        /// 传递到路由处理程序但未使用的自定义值的集合
        /// </summary>
        /// <param name="key">键值</param>
        /// <returns></returns>
        public static object GetTokenValue(string key)
        {
            return req.RequestContext.RouteData.DataTokens[key];
        }
        #endregion


        #region 其他公共方法
        /// <summary>
        /// 输入字符串
        /// </summary>
        /// <param name="str"></param>
        public static void ResponseText(string str)
        {
            resp.Write(str);
        }
        /// <summary>
        /// SHA1 加密方法
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string Sha1(string source)
        {
            return FormsAuthentication.HashPasswordForStoringInConfigFile(source, "SHA1");
        }
        #endregion
    }
}