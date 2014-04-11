var urlComponents = {
	boxHost : 'https://www.box.com',
	boxAPIBase : 'https://api.box.com/2.0',
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
			this.url = this.boxAPIBase
		}else{
			throw new Error("Only auth and api are allowed as hosts")
		}
		return this
	},
	action:function (act) {
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
				case "users":
					this.addURL(this.comp.boxUsers)
				break;
				case "folders":
					this.addURL(this.comp.boxFolders)
				break;
				case "collabs":
				this.addURL(this.comp.boxCollabs)
				break;
			default:
				throw new Error("Unrecognised action")
			}
		}
		return this.url
	},
	folders:function (id) {
			if(typeof id !== 'undefined'){
				return this.url + '/folders/{0}/items'.replace('{0}', id)
			}else{
				return this.url + '/folders'
			}
	}
}


exports.Build = Build


