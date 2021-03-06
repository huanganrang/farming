package jb.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import farming.concurrent.CacheKey;
import farming.concurrent.CompletionService;
import farming.concurrent.Task;
import jb.listener.Application;
import jb.pageModel.*;
import jb.service.FmPropertiesServiceI;
import jb.service.FmPurchaseServiceI;

import jb.service.FmUserServiceI;
import jb.service.impl.CompletionFactory;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

/**
 * FmPurchase管理控制器
 * 
 * @author John
 * 
 */
@Controller
@RequestMapping("/fmPurchaseController")
public class FmPurchaseController extends BaseController {

	@Autowired
	private FmPurchaseServiceI fmPurchaseService;
	@Autowired
	private FmUserServiceI fmUserService;
	@Autowired
	private FmPropertiesServiceI fmPropertiesService;

	/**
	 * 跳转到FmPurchase管理页面
	 * 
	 * @return
	 */
	@RequestMapping("/manager")
	public String manager(HttpServletRequest request) {
		return "/fmpurchase/fmPurchase";
	}

	/**
	 * 获取FmPurchase数据表格
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping("/dataGrid")
	@ResponseBody
	public DataGrid dataGrid(FmPurchase fmPurchase, PageHelper ph) {

		DataGrid dataGrid = fmPurchaseService.dataGrid(fmPurchase, ph);
		if (!CollectionUtils.isEmpty(dataGrid.getRows())) {
			final CompletionService completionService = CompletionFactory.initCompletion();
			for (FmPurchase fmMarquee1 : (List<FmPurchase>) dataGrid.getRows()) {
				completionService.submit(new Task<FmPurchase, String>(new CacheKey("goods",fmMarquee1.getName()),fmMarquee1) {
					@Override
					public String call() throws Exception {
						String format = "<span>%s:%s</span>&nbsp;";
						return fmPropertiesService.getAfterMatching(getD().getName(), JSON.parseObject(getD().getExtFields()), format);
					}

					protected void set(FmPurchase d, String v) {
							d.setExtFields(v);
					}

				});
				BaseData baseData = Application.get(fmMarquee1.getName());
				if (baseData != null) {
					fmMarquee1.setTypeName(Application.getString(baseData.getPid()));
				}
			}
			completionService.sync();
		}
		return dataGrid;
	}
	/**
	 * 获取FmPurchase数据表格excel
	 * 
	 * @param
	 * @return
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 * @throws IOException 
	 */
	@RequestMapping("/download")
	public void download(FmPurchase fmPurchase, PageHelper ph,String downloadFields,HttpServletResponse response) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, IOException{
		DataGrid dg = dataGrid(fmPurchase,ph);		
		downloadFields = downloadFields.replace("&quot;", "\"");
		downloadFields = downloadFields.substring(1,downloadFields.length()-1);
		List<Colum> colums = JSON.parseArray(downloadFields, Colum.class);
		downloadTable(colums, dg, response);
	}
	/**
	 * 跳转到添加FmPurchase页面
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/addPage")
	public String addPage(HttpServletRequest request) {
		FmPurchase fmPurchase = new FmPurchase();
		fmPurchase.setId(UUID.randomUUID().toString());
		return "/fmpurchase/fmPurchaseAdd";
	}

	/**
	 * 添加FmPurchase
	 * 
	 * @return
	 */
	@RequestMapping("/add")
	@ResponseBody
	public Json add(FmPurchase fmPurchase) {
		Json j = new Json();		
		fmPurchaseService.add(fmPurchase);
		j.setSuccess(true);
		j.setMsg("添加成功！");		
		return j;
	}

	/**
	 * 跳转到FmPurchase查看页面
	 * 
	 * @return
	 */
	@RequestMapping("/view")
	public String view(HttpServletRequest request, String id) {
		FmPurchase fmPurchase = fmPurchaseService.get(id);
		fmPurchase.setFmUser(fmUserService.get(fmPurchase.getUserId()));
		String format = "<span>%s:%s</span>&nbsp;";
		fmPurchase.setExtFields(fmPropertiesService.getAfterMatching(fmPurchase.getName(), JSON.parseObject(fmPurchase.getExtFields()),format));
		request.setAttribute("fmPurchase", fmPurchase);
		return "/fmpurchase/fmPurchaseView";
	}

	/**
	 * 跳转到FmPurchase修改页面
	 * 
	 * @return
	 */
	@RequestMapping("/editPage")
	public String editPage(HttpServletRequest request, String id) {
		FmPurchase fmPurchase = fmPurchaseService.get(id);
		request.setAttribute("fmPurchase", fmPurchase);
		return "/fmpurchase/fmPurchaseEdit";
	}

	/**
	 * 修改FmPurchase
	 * 
	 * @param fmPurchase
	 * @return
	 */
	@RequestMapping("/edit")
	@ResponseBody
	public Json edit(FmPurchase fmPurchase) {
		Json j = new Json();		
		fmPurchaseService.edit(fmPurchase);
		j.setSuccess(true);
		j.setMsg("编辑成功！");		
		return j;
	}

	/**
	 * 删除FmPurchase
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public Json delete(String id) {
		Json j = new Json();
		fmPurchaseService.delete(id);
		j.setMsg("删除成功！");
		j.setSuccess(true);
		return j;
	}

}
