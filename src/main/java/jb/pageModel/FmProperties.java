package jb.pageModel;

import java.util.Date;

@SuppressWarnings("serial")
public class FmProperties implements java.io.Serializable {

	private static final long serialVersionUID = 5454155825314635342L;

	private java.lang.String id;	
	private Date addtime;			
	private Date updatetime;			
	private java.lang.Boolean isdeleted;	
	private java.lang.String name;	
	private java.lang.String goodName;	
	private java.lang.String description;	
	private java.lang.String fieldType;	
	private java.lang.Boolean require;	
	private java.lang.String defaultValue;	

	

	public void setId(java.lang.String value) {
		this.id = value;
	}
	
	public java.lang.String getId() {
		return this.id;
	}

	
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}
	
	public Date getAddtime() {
		return this.addtime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
	
	public Date getUpdatetime() {
		return this.updatetime;
	}
	public void setIsdeleted(java.lang.Boolean isdeleted) {
		this.isdeleted = isdeleted;
	}
	
	public java.lang.Boolean getIsdeleted() {
		return this.isdeleted;
	}
	public void setName(java.lang.String name) {
		this.name = name;
	}
	
	public java.lang.String getName() {
		return this.name;
	}
	public void setGoodName(java.lang.String goodName) {
		this.goodName = goodName;
	}
	
	public java.lang.String getGoodName() {
		return this.goodName;
	}
	public void setDescription(java.lang.String description) {
		this.description = description;
	}
	
	public java.lang.String getDescription() {
		return this.description;
	}
	public void setFieldType(java.lang.String fieldType) {
		this.fieldType = fieldType;
	}
	
	public java.lang.String getFieldType() {
		return this.fieldType;
	}
	public void setRequire(java.lang.Boolean require) {
		this.require = require;
	}
	
	public java.lang.Boolean getRequire() {
		return this.require;
	}
	public void setDefaultValue(java.lang.String defaultValue) {
		this.defaultValue = defaultValue;
	}
	
	public java.lang.String getDefaultValue() {
		return this.defaultValue;
	}

}
