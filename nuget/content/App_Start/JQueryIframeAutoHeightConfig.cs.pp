using System.Web.Optimization;

[assembly: WebActivatorEx.PostApplicationStartMethod(typeof($rootnamespace$.JQueryIframeAutoHeightConfig), "RegisterBundles")]
namespace $rootnamespace$
{
  public class JQueryIframeAutoHeightConfig
  {
    public static void RegisterBundles()
    {
      var bundles = BundleTable.Bundles;      
      
      /* Please ensure jQuery is registered and included too */
	  
	  /* Example
	  
      bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                  "~/Scripts/jquery-{version}.js"));
	  */

      bundles.Add(new ScriptBundle("~/bundles/jquery-iframe-auto-height").Include(
                  "~/Scripts/jquery-iframe-auto-height/jquery.browser.js").Include(
                  "~/Scripts/jquery-iframe-auto-height/jquery.iframe-auto-height.plugin.{version}.js"));
    }
  }
}