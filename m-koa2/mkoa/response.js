module.exports = {
    get body(){
        return this._body;
    },
    set body(data){
        this._body = data
    },
    get status(){
        //this.res是外部http模块传递
        return this.res.statusCode
    },
    set status(statusCode){
        if(typeof statusCode !== 'number'){
            throw new Error('statusCode must be number')
        }
        this.res.statusCode = statusCode
    }
}

/*
// 判断了传入变量是否是string、buffe、funtion、stream，最后默认为json
set body(val) {
    const original = this._body;
    this._body = val;
  
    // 什么都不设置，直接返回
    if (null == val) {
      if (!statuses.empty[this.status]) this.status = 204;
      this.remove('Content-Type');
      this.remove('Content-Length');
      this.remove('Transfer-Encoding');
      return;
    }
  
    // set the status
    if (!this._explicitStatus) this.status = 200;
  
    // set the content-type only if not yet set
    const setType = !this.has('Content-Type');
  
    // string
    if ('string' == typeof val) {
      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
      this.length = Buffer.byteLength(val);
      return;
    }
  
    // buffer
    if (Buffer.isBuffer(val)) {
      if (setType) this.type = 'bin';
      this.length = val.length;
      return;
    }
  
    // stream
    if ('function' == typeof val.pipe) {
      onFinish(this.res, destroy.bind(null, val));
      ensureErrorHandler(val, err => this.ctx.onerror(err));
  
      // overwriting
      if (null != original && original != val) this.remove('Content-Length');
  
      if (setType) this.type = 'bin';
      return;
    }
  
    // json
    this.remove('Content-Length');
    this.type = 'json';
  } 
*/