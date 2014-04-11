var urlComponents = {
	boxHost     : 'https://www.box.com',
	boxAPIBase  : 'https://api.box.com/2.0',
	boxUpload   : 'https://upload.box.com/api/2.0',
	boxFolders  : '/folders',
	boxFiles    : '/files',
	boxShared   : '/shared_items',
	boxComments : '/comments',
	boxCollabs  : '/collaborations',
	boxSearch   : '/search',
	boxEvents   : '/events',
	boxUsers    : '/users',
	boxTokens   : '/tokens',
	boxItems		: '/items',
	boxContent  : '/content',
	boxVersions : '/versions'
	oa2Base     : '/api/oauth2',
	oa2Auth     : '/authorize',
	oa2Token    : '/token',
	oa2Revoke   : '/revoke'
}



Build = {
	comps: urlComponents,
	url  : "",
	base : "",
	addURL:function (urlToAdd) {
		this.url = this.url + urlToAdd
	},
	idInURL:function (path, id) {
		if(typeof id !== 'undefined'){
		 this.addURL(path + '/{0}'.replace('{0}', id))
			
		}else{
		 this.addURL(path)
		}
	},
	host:function (host) {
		if(host == 'auth'){
			this.base = host
			this.url = this.comps.boxHost + this.comps.oa2Base
		}else if(host == 'api'){
			this.base = host
			this.url = this.comps.boxAPIBase
		}else if(host == 'upload'){
			this.base = host
			this.url = this.comps.boxUpload
		}else{
			throw new Error("Only auth and api are allowed as hosts")
		}
		return this
	},
	object:function (object,id) {
		if(this.base == 'auth'){
			switch(object){
				case "auth":
					this.addURL(this.comps.oa2Auth)
				break;
				case "token":
					this.addURL(this.comps.oa2Token)
				break;
				case "revoke":
					this.addURL(this.comps.oa2Revoke)
				break;
			default:
				throw new Error("Unrecognised object")
			}
		}else if(this.base == 'api'){
			switch(object){
				case "folders":
					this.idInURL(this.comp.boxFolders,id)
				break;
				case "files":
					this.idInURL(this.comp.boxFiles,id)
				break;
				case "comments":
					this.idInURL(this.comp.boxComments,id)
				break;
				case "collaborations":
					this.idInURL(this.comp.boxCollabs,id)
				break;
				case "users":
					this.idInURL(this.comp.boxUsers,id)
				break;
				case "shared_items":
					this.addURL(this.comp.boxShared)
				break;
				case "search":
					this.addURL(this.comp.boxSearch)
				break;
				case "events":
					this.addURL(this.comp.boxEvents)
				break;
				case "tokens":
					this.addURL(this.comp.boxTokens)
				break;
			default:
				throw new Error("Unrecognised object")
			}
		}else if(this.base == 'upload'){
				this.idInURL(this.comp.boxFiles,id)
		}else{
			throw new Error("Unrecognised object")
		}
		this.base = object
		return this
	},
	action:function (act) {
		switch(this.base){
			case 'folders':
				if(act == 'items'){
					this.addURL(this.comp.boxItems)
				}else if(act == 'collaborations'){
					this.addURL(this.comp.boxCollabs)
				}else{
					throw new Error("Unrecognised action")
				}				
			break;
			case 'files':
				if(act == 'content'){
					this.addURL(this.comp.boxContent)
				}else if(act == 'versions'){
					
					this.addURL(this.comp.boxVersions)
				}else{
					throw new Error("Unrecognised action")
				}
			break;
		default:
				throw new Error("Can only \"act\" upon folders and files")
		}
		return this
	}
}
exports.Build = Build

