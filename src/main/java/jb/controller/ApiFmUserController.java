package jb.controller;

import jb.absx.F;
import jb.listener.Application;
import jb.pageModel.*;
import jb.service.FmGoodsUserServiceI;
import jb.service.FmShopUserServiceI;
import jb.service.FmUserServiceI;
import jb.util.HttpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by lenovo on 2016/8/15.
 *
 * 用户登陆、注册、个人信息等接口
 */
@Controller
@RequestMapping("/api/apiFmUserController")
public class ApiFmUserController extends BaseController {

    @Autowired
    private FmUserServiceI fmUserService;

    @Autowired
    private FmGoodsUserServiceI fmGoodsUserService;

    @Autowired
    private FmShopUserServiceI fmShopUserService;

    @RequestMapping("/userLogin")
    @ResponseBody
    public Json userLogin(String Dto_Mobile, String Dto_Password) {
        Json j = new Json();
        try {
            //String url = "http://yizhuisu.com/api/Ba/userLogin";
            String url = "http://t149127q79.51mypc.cn:11169/api/Ba/userLogin";
            String result = HttpUtil.httpRequest(url, "post", "{\"Dto_Mobile\":\"17717039216\",\"Dto_Password\":\"123456\"}");
            j.setSuccess(true);
            j.setMsg(SUCCESS_MESSAGE);
            j.setObj(result);
        } catch (Exception e) {
            j.setMsg(Application.getString(EX_0001));
            logger.error("登陆异常", e);
        }

        return j;
    }

    @RequestMapping("/add")
    @ResponseBody
    public Json add(FmUser fmUser) {
        Json j = new Json();
        try {
            if(!F.empty(fmUser.getAccount())) {
                fmUserService.add(fmUser);
                j.setSuccess(true);
                j.setMsg(SUCCESS_MESSAGE);
                DataGrid dg = fmUserService.dataGrid(fmUser, null);
                List<FmUser> list =  dg.getRows();
                if(list != null && list.size() > 0) {
                    j.setObj(list.get(0));
                }
            }
        } catch (Exception e) {
            j.setMsg(Application.getString(EX_0001));
            logger.error("注册用户信息异常", e);
        }

        return j;
    }

    @RequestMapping("/get")
    @ResponseBody
    public Json get(FmUser fmUser) {
        Json j = new Json();
        try {
            if(!F.empty(fmUser.getId())) {
                FmUser fu = fmUserService.get(fmUser.getId());
                j.setSuccess(true);
                j.setMsg(SUCCESS_MESSAGE);
                j.setObj(fu);
            }
        } catch (Exception e) {
            j.setMsg(Application.getString(EX_0001));
            logger.error("获取个人资料异常", e);
        }

        return j;
    }

    @RequestMapping("/edit")
    @ResponseBody
    public Json edit(FmUser fmUser) {
        Json j = new Json();
        try {
            if(!F.empty(fmUser.getId())) {
                fmUserService.edit(fmUser);
                j.setSuccess(true);
                j.setMsg(SUCCESS_MESSAGE);
            }
        } catch (Exception e) {
            j.setMsg(Application.getString(EX_0001));
            logger.error("修改个人资料异常", e);
        }

        return j;
    }

    /**
     * 关联
     *
     * @return
     */
    @RequestMapping("/relation")
    @ResponseBody
    public Json relation(String userId, String bizId, String bizType) {
        Json j = new Json();
        try {
            if (!F.empty(userId) && !F.empty(bizId) && !F.empty(bizType)) {

                if("FmGoodsUserServiceI".equals(bizType)){
                    FmGoodsUser fmGoodsUser = new FmGoodsUser();
                    fmGoodsUser.setUserId(userId);
                    fmGoodsUser.setGoodsId(bizId);
                    FmGoodsUser old =  fmGoodsUserService.get(fmGoodsUser);
                    if(old == null){
                        fmGoodsUserService.add(fmGoodsUser);
                    }else{
                        j.fail();
                        j.setMsg("已关联上");
                        return j;
                    }
                }else if("FmShopUserServiceI".equals(bizType)){
                    FmShopUser fmShopUser = new FmShopUser();
                    fmShopUser.setShopId(bizId);
                    fmShopUser.setUserId(userId);
                    FmShopUser old = fmShopUserService.get(fmShopUser);
                    if(old == null){
                        fmShopUserService.add(fmShopUser);
                    }else{
                        j.fail();
                        j.setMsg("已关联上");
                        return j;
                    }
                }

                j.setSuccess(true);
                j.setMsg(SUCCESS_MESSAGE);
            }
        } catch (Exception e) {
            j.setMsg(Application.getString(EX_0001));
            logger.error("关联异常", e);
        }

        return j;
    }

    /**
     * 取消关联
     *
     * @return
     */
    @RequestMapping("/disRelation")
    @ResponseBody
    public Json disRelation(String userId, String bizId, String bizType) {
        Json j = new Json();
        try {
            if (!F.empty(userId) && !F.empty(bizId) && !F.empty(bizType)) {
                if("FmGoodsUserServiceI".equals(bizType)){
                    FmGoodsUser fmGoodsUser = new FmGoodsUser();
                    fmGoodsUser.setUserId(userId);
                    fmGoodsUser.setGoodsId(bizId);
                    fmGoodsUserService.delete(fmGoodsUser);
                }else if("FmShopUserServiceI".equals(bizType)){
                    FmShopUser fmShopUser = new FmShopUser();
                    fmShopUser.setShopId(bizId);
                    fmShopUser.setUserId(userId);
                    fmShopUserService.delete(fmShopUser);
                }
                j.setSuccess(true);
                j.setMsg(SUCCESS_MESSAGE);
            }
        } catch (Exception e) {
            j.setMsg(Application.getString(EX_0001));
            logger.error("取消关联异常", e);
        }

        return j;
    }
}
