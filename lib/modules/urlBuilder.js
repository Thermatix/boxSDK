var urlComponents = {
	boxHost : 'https://www.box.com',
	boxAPIBase : 'https://api.box.com/2.0',
	boxUpload : 'https://upload.box.com/api/2.0,'
	boxFolders : '/folders',
	boxUsers : '/users',
	boxCollabs : '/collaborations',
	oa2Base : '/api/oauth2',
	oa2Auth : '/authorize',
	oa2Token : '/token',
	oa2Revoke : '/revoke',
}

Build = {
	comps: urlComponents,
	url  : "",
	base : "",
	addURL:function (urlToAdd) {
		this.url = this.url + urlToAdd
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
	object:function (act,id) {
		if(this.base == 'auth'){
			switch(act){
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
				throw new Error("Unrecognised action")
			}
		}else if(this.base == 'api'){
			switch(act){
				case "folders":
				if(typeof id !== 'undefined'){
					this.addURL(this.comp.boxFolders + '/{0}'.replace('{0}', id))
				}else{
					this.addURL(this.comp.boxFolders)
				}
				break;
				case "files":
				break;
				case "shared_items":
				break;
				case "comments":
				break;
				case "collabs":
					this.addURL(this.comp.boxCollabs)
				break;
				case "search":
				break;
				case "events":
				break;
				case "users":
					this.addURL(this.comp.boxUsers)
				break;
				case "tokens":
				break;
			default:
				throw new Error("Unrecognised action")
			}
		}
		return this
	},
	folders:function (id) {
			
	}
}
exports.Build = Build


