<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="jb.model.TfmProperties" %>
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
					<th><%=TfmProperties.ALIAS_ADDTIME%></th>	
					<td>
						${fmProperties.addtime}							
					</td>							
					<th><%=TfmProperties.ALIAS_UPDATETIME%></th>	
					<td>
						${fmProperties.updatetime}							
					</td>							
				</tr>		
				<tr>	
					<th><%=TfmProperties.ALIAS_ISDELETED%></th>	
					<td>
						${fmProperties.isdeleted}							
					</td>							
					<th><%=TfmProperties.ALIAS_NAME%></th>	
					<td>
						${fmProperties.name}							
					</td>							
				</tr>		
				<tr>	
					<th><%=TfmProperties.ALIAS_GOOD_NAME%></th>	
					<td>
						${fmProperties.goodName}							
					</td>							
					<th><%=TfmProperties.ALIAS_DESCRIPTION%></th>	
					<td>
						${fmProperties.description}							
					</td>							
				</tr>		
				<tr>	
					<th><%=TfmProperties.ALIAS_FIELD_TYPE%></th>	
					<td>
						${fmProperties.fieldType}							
					</td>							
					<th><%=TfmProperties.ALIAS_REQUIRE%></th>	
					<td>
						${fmProperties.require}							
					</td>							
				</tr>		
				<tr>	
					<th><%=TfmProperties.ALIAS_DEFAULT_VALUE%></th>	
					<td>
						${fmProperties.defaultValue}							
					</td>							
				</tr>		
		</table>
	</div>
</div>