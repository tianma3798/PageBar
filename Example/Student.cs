using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Page4._0
{
    public class Student
    {
        public int Number { get; set; }
        public string Name { get; set; }




        public static List<Student> GetStudent(int count)
        {
            List<Student> list = new List<Student>();
            for (int i = 0; i < count; i++)
            {
                list.Add(new Student() {
                    Number=i,
                    Name="学生名称"+i
                });

            }

            return list;
        }
    }
}
