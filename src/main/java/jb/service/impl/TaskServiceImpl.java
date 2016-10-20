package jb.service.impl;

import jb.absx.F;
import jb.jpush.JPushUtil;
import jb.pageModel.DataGrid;
import jb.pageModel.FmMessage;
import jb.pageModel.PageHelper;
import jb.service.FmMessageServiceI;
import jb.service.TaskServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by john on 16/10/16.
 */
@Service
public class TaskServiceImpl implements TaskServiceI {
    @Autowired
    private FmMessageServiceI fmMessageService;
    @Override
    public void sendMessage() {
        FmMessage fmMessage = new FmMessage();
        fmMessage.setIsdeleted(false);
        fmMessage.setIssended(false);
        PageHelper ph = new PageHelper();
        ph.setSort("sendTime");
        ph.setOrder("asc");
        ph.setHiddenTotal(true);
        DataGrid dg = fmMessageService.dataGrid(fmMessage, ph);
        if(dg != null && dg.getRows() != null && dg.getRows().size() > 0) {
            List<FmMessage> list = dg.getRows();
            Long dateTime = new Date().getTime();
            for(int i=0; i<list.size(); i++) {
                FmMessage fm = list.get(i);
                if(fm.getSendTime() != null && dateTime >= fm.getSendTime().getTime() && !F.empty(fm.getContent())) {
                    JPushUtil.pushMessageToAll(fm.getContent());
                    fm.setIssended(true);
                    fmMessageService.edit(fm);
                }
            }
        }
    }
}