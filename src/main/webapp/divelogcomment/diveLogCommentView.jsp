<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="jb.model.TdiveLogComment" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	$(function() {
		parent.$.messager.progress('close');		
	});
</script>
<div class="easyui-layout" data-options="fit:true,border:false">
	<div data-options="region:'center',border:false">
		<table class="table table-hover table-condensed">
				<tr>	
					<th><%=TdiveLogComment.ALIAS_LOG_ID%></th>	
					<td>
						${diveLogComment.logId}							
					</td>							
					<th><%=TdiveLogComment.ALIAS_COMMENT%></th>	
					<td>
						${diveLogComment.comment}							
					</td>							
				</tr>		
				<tr>	
					<th><%=TdiveLogComment.ALIAS_PID%></th>	
					<td>
						${diveLogComment.pid}							
					</td>							
					<th><%=TdiveLogComment.ALIAS_USER_ID%></th>	
					<td>
						${diveLogComment.userId}							
					</td>							
				</tr>		
				<tr>	
					<th><%=TdiveLogComment.ALIAS_ADDTIME%></th>	
					<td>
						${diveLogComment.addtime}							
					</td>							
				</tr>		
		</table>
	</div>
</div>