﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="blue1.aspx.cs" Inherits="Page4._0.Example.blue1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="../Js/jquery-1.8.2.min.js"></script>
    <link href="../Js/Page4.0/pagebar4.0.min.css" rel="stylesheet" />
    <script src="../Js/Page4.0/pageBar4.0.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div style="width: 500px; margin: auto; margin-top: 50px;">
            <h3>蓝色小按钮样式
            </h3>
            <div class="pageList">
                <table border="1" cellpadding="10" width="100%">
                    <asp:Repeater ID="Repeater1" runat="server">
                        <ItemTemplate>
                            <tr>
                                <td><%#Eval("Number") %></td>
                                <td><%#Eval("Name") %></td>
                            </tr>
                        </ItemTemplate>
                    </asp:Repeater>
                </table>
            </div>
            <div id="pageOne" class="pageBar"></div>
            <script type="text/javascript">
                var pageOne = $('#pageOne').pageBar({
                    pageIndex: '<%=pageIndex%>',
                    pageSize: '<%=pageSize%>',
                    recordCount: '<%=recordCount%>',
                    showType: 'bluePager',
                    submitEvent: function (index) {
                        goToIndex(index);
                    }
                });
                //分页按钮事件
                function goToIndex(index) {
                    var loc = window.location;
                    var url = 'http://' + loc.host + loc.pathname + '?pageIndex=' + index;
                    location.href = url;
                }
            </script>
        </div>
    </form>
</body>
</html>
