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
	boxVersions : '/versions',
	boxCopy			: '/copy',
	boxTrash		: '/trash',
	oa2Base     : '/api/oauth2',
	oa2Auth     : '/authorize',
	oa2Token    : '/token',
	oa2Revoke   : '/revoke'
}



exports.build = {
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
					console.log(this.url)
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
					this.idInURL(this.comps.boxFolders,id)
				break;
				case "files":
					this.idInURL(this.comps.boxFiles,id)
				break;
				case "comments":
					this.idInURL(this.comps.boxComments,id)
				break;
				case "collaborations":
					this.idInURL(this.comps.boxCollabs,id)
				break;
				case "users":
					this.idInURL(this.comps.boxUsers,id)
				break;
				case "shared_items":
					this.addURL(this.comps.boxShared)
				break;
				case "search":
					this.addURL(this.comps.boxSearch)
				break;
				case "events":
					this.addURL(this.comps.boxEvents)
				break;
				case "tokens":
					this.addURL(this.comps.boxTokens)
				break;
			default:
				throw new Error("Unrecognised object")
			}
		}else if(this.base == 'upload'){
				this.idInURL(this.comps.boxFiles,id)
		}else{
			throw new Error("Unrecognised object")
		}
		this.base = object
		return this
	},
	action:function (act) {
		switch(this.base){
			case 'folders':
				switch(act){
					case 'items':
						this.addURL(this.comps.boxItems)
					break
					case'collaborations':
						this.addURL(this.comps.boxCollabs)
					break
					case 'copy':
						this.addURL(this.comps.boxCopy)
					break
					case 'trash':
						this.addURL(this.comps.boxTrash)
				default:
					throw new Error("Unrecognised action")
				}				
			break;
			case 'files':
				switch(act){
					case 'content':
						this.addURL(this.comps.boxContent)
					break
					case 'versions':
						this.addURL(this.comps.boxVersions)
					break
					case 'copy':
						this.addURL(this.comps.boxCopy)
					break
				default:
					throw new Error("Unrecognised action")
				}
			break;
		default:
				throw new Error("Can only \"act\" upon folders and files")
		}
		return this
	}
}

