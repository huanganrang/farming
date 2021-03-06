package jb.controller;

import com.alibaba.fastjson.JSON;
import jb.pageModel.*;
import jb.service.FmMessageServiceI;
import jb.util.ConfigUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.UUID;

/**
 * FmMessage管理控制器
 * 
 * @author John
 * 
 */
@Controller
@RequestMapping("/fmMessageController")
public class FmMessageController extends BaseController {

	@Autowired
	private FmMessageServiceI fmMessageService;


	/**
	 * 跳转到FmMessage管理页面
	 * 
	 * @return
	 */
	@RequestMapping("/manager")
	public String manager(HttpServletRequest request) {
		return "/fmmessage/fmMessage";
	}

	/**
	 * 获取FmMessage数据表格
	 * 
	 * @param fmMessage
	 * @return
	 */
	@RequestMapping("/dataGrid")
	@ResponseBody
	public DataGrid dataGrid(FmMessage fmMessage, PageHelper ph) {
		return fmMessageService.dataGrid(fmMessage, ph);
	}
	/**
	 * 获取FmMessage数据表格excel
	 * 
	 * @param fmMessage
	 * @return
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 * @throws IOException 
	 */
	@RequestMapping("/download")
	public void download(FmMessage fmMessage, PageHelper ph,String downloadFields,HttpServletResponse response) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, IOException{
		DataGrid dg = dataGrid(fmMessage,ph);		
		downloadFields = downloadFields.replace("&quot;", "\"");
		downloadFields = downloadFields.substring(1,downloadFields.length()-1);
		List<Colum> colums = JSON.parseArray(downloadFields, Colum.class);
		downloadTable(colums, dg, response);
	}
	/**
	 * 跳转到添加FmMessage页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/addPage")
	public String addPage(HttpServletRequest request) {
		FmMessage fmMessage = new FmMessage();
		fmMessage.setId(UUID.randomUUID().toString());
		return "/fmmessage/fmMessageAdd";
	}

	/**
	 * 添加FmMessage
	 * 
	 * @return
	 */
	@RequestMapping("/add")
	@ResponseBody
	public Json add(FmMessage fmMessage,@RequestParam MultipartFile equipIconFile, HttpServletRequest request) {
		Json j = new Json();
		SessionInfo sessionInfo = (SessionInfo) request.getSession().getAttribute(ConfigUtil.getSessionInfoName());
		fmMessage.setLoginId(sessionInfo.getName());
		fmMessage.setUrl(uploadFile(request, "message", equipIconFile));
		fmMessageService.add(fmMessage);
		j.setSuccess(true);
		j.setMsg("添加成功！");		
		return j;
	}

	/**
	 * 跳转到FmMessage查看页面
	 * 
	 * @return
	 */
	@RequestMapping("/view")
	public String view(HttpServletRequest request, String id) {
		FmMessage fmMessage = fmMessageService.get(id);
		request.setAttribute("fmMessage", fmMessage);
		return "/fmmessage/fmMessageView";
	}

	/**
	 * 跳转到FmMessage修改页面
	 * 
	 * @return
	 */
	@RequestMapping("/editPage")
	public String editPage(HttpServletRequest request, String id) {
		FmMessage fmMessage = fmMessageService.get(id);
		request.setAttribute("fmMessage", fmMessage);
		return "/fmmessage/fmMessageEdit";
	}

	/**
	 * 修改FmMessage
	 * 
	 * @param fmMessage
	 * @return
	 */
	@RequestMapping("/edit")
	@ResponseBody
	public Json edit(FmMessage fmMessage,@RequestParam MultipartFile equipIconFile, HttpServletRequest request) {
		Json j = new Json();
		SessionInfo sessionInfo = (SessionInfo) request.getSession().getAttribute(ConfigUtil.getSessionInfoName());
		fmMessage.setLoginId(sessionInfo.getName());
		fmMessage.setUrl(uploadFile(request, "message", equipIconFile));
		fmMessageService.edit(fmMessage);
		j.setSuccess(true);
		j.setMsg("编辑成功！");		
		return j;
	}

	/**
	 * 删除FmMessage
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public Json delete(String id) {
		Json j = new Json();
		fmMessageService.delete(id);
		j.setMsg("删除成功！");
		j.setSuccess(true);
		return j;
	}

}
