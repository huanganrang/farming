<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="jb.model.TdiveTravel"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<script type="text/javascript">
	$(function() {
		parent.$.messager.progress('close');
		$('#form').form({
			url : '${pageContext.request.contextPath}/diveTravelController/edit',
			onSubmit : function() {
				parent.$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
				var isValid = $(this).form('validate');
				if (!isValid) {
					parent.$.messager.progress('close');
				}
				return isValid;
			},
			success : function(result) {
				parent.$.messager.progress('close');
				result = $.parseJSON(result);
				if (result.success) {
					parent.$.modalDialog.openner_dataGrid.datagrid('reload');//之所以能在这里调用到parent.$.modalDialog.openner_dataGrid这个对象，是因为user.jsp页面预定义好了
					parent.$.modalDialog.handler.dialog('close');
				} else {
					parent.$.messager.alert('错误', result.msg, 'error');
				}
			}
		});
	});
</script>
<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false" title=""
		style="overflow: hidden;">
		<form id="form" method="post">
			<input type="hidden" name="id" value="${diveTravel.id}" />
			<table class="table table-hover table-condensed">
				<tr>
					<th><%=TdiveTravel.ALIAS_NAME%></th>
					<td><input class="span2" name="name" type="text" class="span2"
						value="${diveTravel.name}" /></td>
					<th><%=TdiveTravel.ALIAS_SUMARY%></th>
					<td><input class="span2" name="sumary" type="text"
						class="span2" value="${diveTravel.sumary}" /></td>
				</tr>
				<tr>
					<th><%=TdiveTravel.ALIAS_PRICE%></th>
					<td><input class="span2" name="price" type="text"
						class="span2" value="${diveTravel.price}" /></td>
					<th><%=TdiveTravel.ALIAS_ICON%></th>
					<td><input class="span2" name="icon" type="text" class="span2"
						value="${diveTravel.icon}" /></td>
				</tr>
				<tr>
					<th><%=TdiveTravel.ALIAS_DESCRIPTION%></th>
					<td><input class="span2" name="description" type="text"
						class="span2" value="${diveTravel.description}" /></td>
					<th><%=TdiveTravel.ALIAS_AREA%></th>
					<td><input class="span2" name="area" type="text" class="span2"
						value="${diveTravel.area}" /></td>
				</tr>
				<tr>
					<th><%=TdiveTravel.ALIAS_FEATURE%></th>
					<td><input class="span2" name="feature" type="text"
						class="span2" value="${diveTravel.feature}" /></td>
					<th><%=TdiveTravel.ALIAS_STATUS%></th>
					<td><input class="span2" name="status" type="text"
						class="span2" value="${diveTravel.status}" /></td>
				</tr>
				<tr>
					<th><%=TdiveTravel.ALIAS_ADDTIME%></th>
					<td><input class="span2" name="addtime" type="text"
						onclick="WdatePicker({dateFmt:'<%=TdiveTravel.FORMAT_ADDTIME%>'})"
						maxlength="0" value="${diveTravel.addtime}" /></td>
				</tr>
			</table>
		</form>
	</div>
</div>