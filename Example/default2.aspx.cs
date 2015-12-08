using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Page4._0.Example
{
    public partial class default2 : System.Web.UI.Page
    {


        public int pageIndex;
        public int pageSize = 5;
        public int recordCount;

        protected void Page_Load(object sender, EventArgs e)
        {
            recordCount = 18;
            pageIndex = ReqHelper.GetInt("pageIndex",1);

            List<Student> list = Student.GetStudent(recordCount);
            List<Student> pageList = list.OrderBy(q => q.Number)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();


            Repeater1.DataSource = pageList;
            Repeater1.DataBind();
        }




    }
}