"use strict";(self.webpackChunkangular_starter=self.webpackChunkangular_starter||[]).push([[231],{3231:(T,f,i)=>{i.r(f),i.d(f,{UsersModule:()=>L});var l=i(2619),p=i(4182),_=i(6814),a=i(95),h=i(1462),c=i(3714),g=i(4887),u=i(1631),t=i(9212),m=i(1474);let U=(()=>{class n{constructor(e){this.http=e,this.store=(0,h.W_)(this.http,{apiUrlBase:"https://jsonplaceholder.typicode.com"}),this.users=this.store({apiUrl:"/users",uniqueId:"id"})}static#t=this.\u0275fac=function(o){return new(o||n)(t.LFG(m.eN))};static#e=this.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Z=i(5640);function x(n,s){1&n&&(t.TgZ(0,"div",1)(1,"div",2)(2,"a",3),t._uU(3,"Back to users"),t.qZA(),t.TgZ(4,"h1"),t._UZ(5,"i",4),t._uU(6),t.qZA(),t.TgZ(7,"div",5)(8,"div",6)(9,"table",7)(10,"tbody")(11,"tr")(12,"td")(13,"strong"),t._uU(14,"Name"),t.qZA()(),t.TgZ(15,"td"),t._uU(16),t.qZA()(),t.TgZ(17,"tr")(18,"td")(19,"strong"),t._uU(20,"Email"),t.qZA()(),t.TgZ(21,"td"),t._uU(22),t.qZA()(),t.TgZ(23,"tr")(24,"td")(25,"strong"),t._uU(26,"Website"),t.qZA()(),t.TgZ(27,"td"),t._uU(28),t.qZA()(),t.TgZ(29,"tr")(30,"td")(31,"strong"),t._uU(32,"Phone Number"),t.qZA()(),t.TgZ(33,"td"),t._uU(34),t.qZA()()()()()()()()),2&n&&(t.xp6(6),t.hij(" ",s.name,""),t.xp6(10),t.Oqu(s.name),t.xp6(6),t.Oqu(s.email),t.xp6(6),t.Oqu(s.website),t.xp6(6),t.Oqu(s.phone))}let v=(()=>{class n{constructor(e,o){this.route=e,this.api=o,this.user$=this.route.params.pipe((0,u.z)(r=>this.api.http.get("https://jsonplaceholder.typicode.com/users/"+r.userId)))}ngOnInit(){}ngOnDestroy(){}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(g.gz),t.Y36(U))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-user"]],decls:3,vars:3,consts:[["class","container mt-3"],[1,"container","mt-3"],[2,"max-width","480px","margin","auto"],["routerLink","/users/",1,"float-end"],[1,"fas","fa-user"],[1,"card"],[1,"card-body"],[1,"table","table-sm","table-striped","mb-0"]],template:function(o,r){if(1&o&&(t.TgZ(0,"app-masterpage"),t.YNc(1,x,35,5,"div",0),t.ALo(2,"async"),t.qZA()),2&o){let d;t.xp6(1),t.um2(1,(d=t.lcZ(2,1,r.user$))?1:-1,d)}},dependencies:[g.rH,Z.f,_.Ov],changeDetection:0})}return n})();var A=i(3081),b=i(5300);const F=n=>[n];function y(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"a",27),t._uU(3),t.qZA()(),t.TgZ(4,"td")(5,"a",28),t.ALo(6,"phoneNumber"),t._uU(7),t.ALo(8,"phoneNumber"),t.qZA()(),t.TgZ(9,"td")(10,"a",28),t._uU(11),t.qZA()(),t.TgZ(12,"td")(13,"div",29)(14,"a",30),t.NdJ("click",function(){const d=t.CHM(e).$implicit,C=t.oxw(3);return t.KtG(C.edit(d))}),t._UZ(15,"app-icons",31),t.qZA(),t.TgZ(16,"a",32),t.NdJ("click",function(){const d=t.CHM(e).$implicit,C=t.oxw(3);return t.KtG(C.delete(d))}),t._UZ(17,"app-icons",33),t.qZA()()()()}if(2&n){const e=s.$implicit;t.xp6(2),t.Q6J("routerLink",t.VKq(10,F,"./"+e.id)),t.xp6(1),t.Oqu(e.name),t.xp6(2),t.MGl("href","tel:",t.lcZ(6,6,e.phone),"",t.LSH),t.xp6(2),t.Oqu(t.lcZ(8,8,e.phone)),t.xp6(3),t.MGl("href","mailto:",e.email,"",t.LSH),t.xp6(1),t.Oqu(e.email)}}function N(n,s){if(1&n&&(t.TgZ(0,"table",26)(1,"thead")(2,"tr")(3,"th"),t._uU(4,"Name"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Phone"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"Email"),t.qZA(),t.TgZ(9,"th"),t._uU(10,"Actions"),t.qZA()()(),t.TgZ(11,"tbody"),t.SjG(12,y,18,12,"tr",null,t.x6l),t.qZA()()),2&n){const e=t.oxw();t.wJu(12,e.data)}}function M(n,s){1&n&&(t.TgZ(0,"p"),t._uU(1,"No users found"),t.qZA())}function E(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"a",4),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.editUndo())}),t._uU(1,"Undo"),t.qZA()}}function q(n,s){1&n&&(t.TgZ(0,"h3"),t._uU(1,"Edit existing user"),t.qZA())}function w(n,s){1&n&&(t.TgZ(0,"h3"),t._uU(1,"Add a new user"),t.qZA())}function I(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"button",34),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.save())}),t._UZ(1,"app-icons",31),t._uU(2," Save User"),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("disabled",e.modifying)}}function O(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"button",34),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.save())}),t._UZ(1,"app-icons",35),t._uU(2," Create User"),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("disabled",e.modifying)}}function D(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"a",4),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.refresh())}),t._UZ(4,"app-icons",5),t.qZA(),t.TgZ(5,"h1"),t._UZ(6,"app-icons",6),t._uU(7),t.qZA(),t.TgZ(8,"div",7)(9,"div",8)(10,"nts-api-state",9)(11,"div",10),t.YNc(12,N,14,0,"table",11),t.qZA()(),t.YNc(13,M,2,0,"ng-template"),t.qZA()()(),t.TgZ(14,"div",12)(15,"div",13)(16,"div",8),t.YNc(17,E,2,0,"a",14)(18,q,2,0,"h3")(19,w,2,0,"h3"),t._UZ(20,"hr",15),t.TgZ(21,"form",16)(22,"p",15)(23,"span",17),t._UZ(24,"input",18),t.TgZ(25,"label",19),t._uU(26,"Name"),t.qZA()()(),t.TgZ(27,"p",15)(28,"span",17),t._UZ(29,"input",20),t.TgZ(30,"label",21),t._uU(31,"Email"),t.qZA()()(),t.TgZ(32,"p",15)(33,"span",17),t._UZ(34,"input",22),t.TgZ(35,"label",23),t._uU(36,"Phone Number"),t.qZA()()(),t.TgZ(37,"div",24),t.YNc(38,I,3,1,"button",25)(39,O,3,1,"button",25),t.qZA()()()()()()()}if(2&n){const e=t.oxw();let o;t.xp6(7),t.hij(" List of users (",null!==(o=null==s||null==s.data?null:s.data.length)&&void 0!==o?o:0,")"),t.xp6(3),t.Q6J("state",s),t.xp6(2),t.um2(12,null!=s.data&&s.data.length?12:-1),t.xp6(5),t.um2(17,e.isEdit()?17:-1),t.xp6(1),t.um2(18,e.isEdit()?18:-1),t.xp6(1),t.um2(19,e.isEdit()?-1:19),t.xp6(2),t.Q6J("formGroup",e.userForm),t.xp6(17),t.um2(38,e.isEdit()?38:-1),t.xp6(1),t.um2(39,e.isEdit()?-1:39)}}let G=(()=>{class n{constructor(e,o){this.api=e,this.fb=o,this.userForm=this.fb.group({address:new a.FormControl,company:new a.FormControl,email:new a.FormControl,id:new a.FormControl,name:new a.FormControl,phone:new a.FormControl,username:new a.FormControl,website:new a.FormControl}),this.isEdit=(0,t.tdS)(!1)}ngOnInit(){}save(){const e=this.userForm.getRawValue();(this.isEdit()?this.api.users.put(e):this.api.users.post(e)).subscribe(()=>{this.userForm.reset(),this.isEdit.set(!1)})}edit(e){this.userForm.patchValue(e),this.isEdit.set(!0)}editUndo(){this.userForm.reset(),this.isEdit.set(!1)}delete(e){confirm(`Are you sure you want to delete ${e.name}?`)&&this.api.users.delete(e).subscribe()}refresh(){this.api.users.refresh().subscribe()}ngOnDestroy(){}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(p.sM),t.Y36(a.NonNullableFormBuilder))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-users"]],decls:3,vars:3,consts:[["class","container mt-3"],[1,"container","mt-3"],[1,"row"],[1,"col","col-12","col-md-9"],[1,"float-end",3,"click"],["icon","refresh"],["icon","users"],[1,"card"],[1,"card-body"],[3,"state"],[1,"table-container"],["class","table table-sm table-striped mb-0 table-mobile"],[1,"col","col-12","col-md-3"],[1,"card","mb-3"],["class","float-end"],[1,"mb-4"],[3,"formGroup"],[1,"p-float-label","w-100"],["id","name","type","text","pInputText","","formControlName","name",1,"w-100"],["for","name"],["id","email","type","text","pInputText","","formControlName","email",1,"w-100"],["for","email"],["id","phone","type","text","pInputText","","formControlName","phone",1,"w-100"],["for","phone"],[1,"float-end"],["class","btn btn-primary",3,"disabled"],[1,"table","table-sm","table-striped","mb-0","table-mobile"],[3,"routerLink"],[3,"href"],[1,"text-end"],[1,"me-3",3,"click"],["icon","cog"],[3,"click"],["icon","trash"],[1,"btn","btn-primary",3,"disabled","click"],["icon","plus"]],template:function(o,r){if(1&o&&(t.TgZ(0,"app-masterpage"),t.YNc(1,D,40,9,"div",0),t.ALo(2,"async"),t.qZA()),2&o){let d;t.xp6(1),t.um2(1,(d=t.lcZ(2,1,r.api.users.state$))?1:-1,d)}},dependencies:[g.rH,a.\u0275NgNoValidate,a.DefaultValueAccessor,a.NgControlStatus,a.NgControlStatusGroup,a.FormGroupDirective,a.FormControlName,Z.f,A.IconsComponent,h.$U,c.o,_.Ov,b.X],styles:["@media (max-width: 998px){.table-container[_ngcontent-%COMP%]{overflow:auto}}"],changeDetection:0})}return n})();const J=[{path:":userId",component:v,title:(0,p.Z1)("Modify User")},{path:"",component:G,title:(0,p.Z1)("Users")}],B=g.Bz.forChild(J);let L=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[_.ez,p.m8,a.FormsModule,a.ReactiveFormsModule,l.eK,l.Uf,B,h.bp,c.j]})}return n})()},3714:(T,f,i)=>{i.d(f,{j:()=>h,o:()=>a});var l=i(9212),p=i(6814),_=i(95);let a=(()=>{class c{el;ngModel;cd;filled;constructor(u,t,m){this.el=u,this.ngModel=t,this.cd=m}ngAfterViewInit(){this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(t){return new(t||c)(l.Y36(l.SBq),l.Y36(_.NgModel,8),l.Y36(l.sBO))};static \u0275dir=l.lG2({type:c,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component","p-element"],hostVars:2,hostBindings:function(t,m){1&t&&l.NdJ("input",function(Z){return m.onInput(Z)}),2&t&&l.ekj("p-filled",m.filled)}})}return c})(),h=(()=>{class c{static \u0275fac=function(t){return new(t||c)};static \u0275mod=l.oAB({type:c});static \u0275inj=l.cJS({imports:[p.ez]})}return c})()}}]);