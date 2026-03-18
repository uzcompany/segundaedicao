import { useState, useRef, useEffect } from "react";
 
// ── THEMES ─────────────────────────────────────────────────────
const DARK={bg:"#080808",surface:"#101010",card:"#161616",border:"#242424",accent:"#E0E0E0",accentSoft:"rgba(220,220,220,0.07)",green:"#1DB97A",yellow:"#F0A500",red:"#E05555",blue:"#4B9EFF",text:"#F0F0F0",textMuted:"#606060",textDim:"#2E2E2E",shadow:"0 8px 32px rgba(0,0,0,0.8)"};
const LIGHT={bg:"#F0F0F8",surface:"#FFFFFF",card:"#FFFFFF",border:"#E2E2EE",accent:"#6C5FFF",accentSoft:"rgba(108,95,255,0.10)",green:"#16A34A",yellow:"#D97706",red:"#DC2626",blue:"#2563EB",text:"#1A1A30",textMuted:"#55557A",textDim:"#AAAACC",shadow:"0 4px 20px rgba(0,0,0,0.08)"};
 
const ICON_LIST=["▣","▦","◫","◉","◎","◈","★","♦","☀","☁","⚡","🔥","💡","🎯","📌","📋","📊","📈","💰","🏢","👤","🔔","⚙","🎨","🚀","💎","🌟","✅","📝","💼","🏆","🎪","🌈","⭐","🎭","🦁","🐯","🦊","🦋","🌺"];
const COLOR_PALETTE=["#E0E0E0","#FF6B6B","#FF8E53","#FFD93D","#6BCB77","#4D96FF","#C77DFF","#FF6BD6","#00D4AA","#FF4757","#2ED573","#1E90FF","#FF6348","#ECCC68","#A29BFE","#FD79A8","#00CEC9","#E17055","#74B9FF","#55EFC4","#FDCB6E","#6C5CE7","#E84393","#00B894","#D63031","#0984E3","#F0A500","#1DB97A","#E05555","#4B9EFF"];
const TODAY="2026-03-18";
const TOMORROW="2026-03-19";
const CURRENCIES={BRL:{symbol:"R$",name:"Real"},USD:{symbol:"$",name:"Dólar"},EUR:{symbol:"€",name:"Euro"}};
 
const TXT={
  pt:{dashboard:"Dashboard",tasks:"Tarefas",companies:"Empresas",clients:"Clientes",financial:"Financeiro",notif:"Notificações",newTask:"Nova Tarefa",newCompany:"Nova Empresa",newClient:"Novo Cliente",newEntry:"Novo Lançamento",settings:"Configurações",filterCompany:"Filtrar empresa",allCompanies:"Todas",allClients:"Todos",todo:"A Fazer",doing:"Em Andamento",done:"Concluído",high:"Alta",medium:"Média",low:"Baixa",priority:"Prioridade",status:"Status",title:"Título",company:"Empresa",client:"Cliente",assignee:"Responsável",due:"Prazo",cancel:"Cancelar",save:"Salvar",create:"Criar",income:"Entrada",expense:"Saída",balance:"Saldo",entries:"Lançamentos",currency:"Moeda",language:"Idioma",theme:"Tema",dark:"Preto",light:"Claro",markAllRead:"Marcar tudo como lido",markAllDone:"Marcar tudo como feito",todayLabel:"Vence Hoje",tomorrowLabel:"Vence Amanhã",noPending:"Nenhuma notificação pendente.",noCurrencyForEntry:"Moeda deste lançamento",kanban:"Kanban",list:"Lista",calendar:"Calendário",gantt:"Gantt",editProfile:"Editar Perfil",name:"Nome",role:"Cargo",profilePhoto:"Foto de Perfil (emoji)",concludeCompany:"Concluir",deleteCompany:"Excluir",projectTypes:"Tipos de Projeto",addType:"+ Adicionar",active:"Ativo",viewTasks:"Ver Tarefas",completedCompanies:"Empresas Concluídas",totalTasks:"Total Tarefas",completed:"Concluídas",inProgress:"Em Andamento",highPri:"Alta Prioridade",incomeToday:"Entradas Hoje",expenseToday:"Saídas Hoje",progressByCompany:"Progresso por Empresa",recentTasks:"Tarefas Recentes",noTask:"Nenhuma tarefa.",noClient:"Nenhum cliente.",taskDetail:"Detalhes da Tarefa",editTask:"Editar Tarefa",saveChanges:"Salvar Alterações",deleteTask:"Excluir",closeBtn:"Fechar",editClient:"Editar Cliente",saveClient:"Salvar Cliente",noProjectTypes:"Selecione uma empresa para ver os tipos.",newType:"+ Novo tipo",totalIncome:"Total Entradas",totalExpense:"Total Saídas",dragHint:"💡 Arraste tarefas para outras datas",noGantt:"Adicione prazos para ver o Gantt.",searchClient:"Buscar...",icon:"Ícone / Emoji",color:"Cor",customizeNav:"Personalizar Aba",saveNav:"Salvar",entryType:"Tipo",entryAmount:"Valor",entryDate:"Data",entryNotes:"Observações",entryCompany:"Empresa",entryClient:"Cliente",post:"Lançar",address:"Endereço",email:"Email",phone:"Telefone",companies2:"Empresa(s)",projectsCol:"Projetos"},
  en:{dashboard:"Dashboard",tasks:"Tasks",companies:"Companies",clients:"Clients",financial:"Financial",notif:"Notifications",newTask:"New Task",newCompany:"New Company",newClient:"New Client",newEntry:"New Entry",settings:"Settings",filterCompany:"Filter company",allCompanies:"All",allClients:"All",todo:"To Do",doing:"In Progress",done:"Done",high:"High",medium:"Medium",low:"Low",priority:"Priority",status:"Status",title:"Title",company:"Company",client:"Client",assignee:"Assignee",due:"Due Date",cancel:"Cancel",save:"Save",create:"Create",income:"Income",expense:"Expense",balance:"Balance",entries:"Entries",currency:"Currency",language:"Language",theme:"Theme",dark:"Black",light:"Light",markAllRead:"Mark all as read",markAllDone:"Mark all as done",todayLabel:"Due Today",tomorrowLabel:"Due Tomorrow",noPending:"No pending notifications.",noCurrencyForEntry:"Currency for this entry",kanban:"Kanban",list:"List",calendar:"Calendar",gantt:"Gantt",editProfile:"Edit Profile",name:"Name",role:"Role",profilePhoto:"Profile Photo (emoji)",concludeCompany:"Complete",deleteCompany:"Delete",projectTypes:"Project Types",addType:"+ Add",active:"Active",viewTasks:"View Tasks",completedCompanies:"Completed Companies",totalTasks:"Total Tasks",completed:"Completed",inProgress:"In Progress",highPri:"High Priority",incomeToday:"Income Today",expenseToday:"Expenses Today",progressByCompany:"Progress by Company",recentTasks:"Recent Tasks",noTask:"No tasks.",noClient:"No clients.",taskDetail:"Task Details",editTask:"Edit Task",saveChanges:"Save Changes",deleteTask:"Delete",closeBtn:"Close",editClient:"Edit Client",saveClient:"Save Client",noProjectTypes:"Select a company to see types.",newType:"+ New type",totalIncome:"Total Income",totalExpense:"Total Expenses",dragHint:"💡 Drag tasks to other dates",noGantt:"Add deadlines to see Gantt.",searchClient:"Search...",icon:"Icon / Emoji",color:"Color",customizeNav:"Customize Tab",saveNav:"Save",entryType:"Type",entryAmount:"Amount",entryDate:"Date",entryNotes:"Notes",entryCompany:"Company",entryClient:"Client",post:"Post",address:"Address",email:"Email",phone:"Phone",companies2:"Company(ies)",projectsCol:"Projects"},
  es:{dashboard:"Dashboard",tasks:"Tareas",companies:"Empresas",clients:"Clientes",financial:"Financiero",notif:"Notificaciones",newTask:"Nueva Tarea",newCompany:"Nueva Empresa",newClient:"Nuevo Cliente",newEntry:"Nuevo Registro",settings:"Configuración",filterCompany:"Filtrar empresa",allCompanies:"Todas",allClients:"Todos",todo:"Por Hacer",doing:"En Progreso",done:"Hecho",high:"Alta",medium:"Media",low:"Baja",priority:"Prioridad",status:"Estado",title:"Título",company:"Empresa",client:"Cliente",assignee:"Responsable",due:"Fecha",cancel:"Cancelar",save:"Guardar",create:"Crear",income:"Ingreso",expense:"Gasto",balance:"Saldo",entries:"Registros",currency:"Moneda",language:"Idioma",theme:"Tema",dark:"Negro",light:"Claro",markAllRead:"Marcar todo leído",markAllDone:"Marcar todo hecho",todayLabel:"Vence Hoy",tomorrowLabel:"Vence Mañana",noPending:"Sin notificaciones pendientes.",noCurrencyForEntry:"Moneda de este registro",kanban:"Kanban",list:"Lista",calendar:"Calendario",gantt:"Gantt",editProfile:"Editar Perfil",name:"Nombre",role:"Cargo",profilePhoto:"Foto de Perfil (emoji)",concludeCompany:"Completar",deleteCompany:"Eliminar",projectTypes:"Tipos de Proyecto",addType:"+ Agregar",active:"Activo",viewTasks:"Ver Tareas",completedCompanies:"Empresas Completadas",totalTasks:"Total Tareas",completed:"Completadas",inProgress:"En Progreso",highPri:"Alta Prioridad",incomeToday:"Ingresos Hoy",expenseToday:"Gastos Hoy",progressByCompany:"Progreso por Empresa",recentTasks:"Tareas Recientes",noTask:"Sin tareas.",noClient:"Sin clientes.",taskDetail:"Detalles de Tarea",editTask:"Editar Tarea",saveChanges:"Guardar Cambios",deleteTask:"Eliminar",closeBtn:"Cerrar",editClient:"Editar Cliente",saveClient:"Guardar Cliente",noProjectTypes:"Selecciona una empresa para ver tipos.",newType:"+ Nuevo tipo",totalIncome:"Total Ingresos",totalExpense:"Total Gastos",dragHint:"💡 Arrastra tareas a otras fechas",noGantt:"Agrega fechas para ver el Gantt.",searchClient:"Buscar...",icon:"Ícono / Emoji",color:"Color",customizeNav:"Personalizar Pestaña",saveNav:"Guardar",entryType:"Tipo",entryAmount:"Monto",entryDate:"Fecha",entryNotes:"Notas",entryCompany:"Empresa",entryClient:"Cliente",post:"Registrar",address:"Dirección",email:"Email",phone:"Teléfono",companies2:"Empresa(s)",projectsCol:"Proyectos"},
};
 
function Modal({children,onClose,C,title,wide}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}><div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:26,width:wide?640:490,maxWidth:"96vw",maxHeight:"92vh",overflowY:"auto",boxShadow:C.shadow}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><h2 style={{fontSize:18,color:C.text,fontWeight:600}}>{title}</h2><button onClick={onClose} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:22,lineHeight:1,padding:0}}>×</button></div><div style={{display:"flex",flexDirection:"column",gap:12}}>{children}</div></div></div>);}
function Field({label,C,children,half}){return(<div style={{flex:half?"1 1 45%":"1 1 100%"}}><label style={{fontSize:10,color:C.textMuted,fontWeight:600,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:0.7}}>{label}</label>{children}</div>);}
function Chip({label,color,bg,border}){return <span style={{display:"inline-flex",alignItems:"center",fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:600,whiteSpace:"nowrap",color,background:bg||`${color}18`,border:border||`1px solid ${color}28`}}>{label}</span>;}
function inp(C,ex={}){return{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,color:C.text,fontSize:13,padding:"9px 12px",width:"100%",fontFamily:"inherit",...ex};}
function Actions({C,onCancel,onConfirm,lbl}){return(<div style={{display:"flex",gap:9,marginTop:8}}><button onClick={onCancel} style={{flex:1,padding:"10px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer"}}>Cancel</button><button onClick={onConfirm} style={{flex:2,padding:"10px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.accent,border:"none",color:C.bg,cursor:"pointer"}}>{lbl}</button></div>);}
 
function IconPicker({C,onSelect,onClose}){return(<div style={{position:"absolute",bottom:"110%",left:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:10,zIndex:600,boxShadow:C.shadow,width:280}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{ICON_LIST.map(ic=>(<button key={ic} onClick={()=>{onSelect(ic);onClose();}} style={{width:32,height:32,borderRadius:7,background:"none",border:`1px solid ${C.border}`,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}} onMouseEnter={e=>e.currentTarget.style.background=C.accentSoft} onMouseLeave={e=>e.currentTarget.style.background="none"}>{ic}</button>))}</div></div>);}
function ColorPicker({C,onSelect,onClose,current}){return(<div style={{position:"absolute",bottom:"110%",left:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:10,zIndex:600,boxShadow:C.shadow,width:260}} onClick={e=>e.stopPropagation()}><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{COLOR_PALETTE.map(col=>(<div key={col} onClick={()=>{onSelect(col);onClose();}} style={{width:24,height:24,borderRadius:6,background:col,cursor:"pointer",border:`2px solid ${current===col?"#fff":"transparent"}`,flexShrink:0}}/>))}</div></div>);}
 
// Inline quick-edit cell for list view
function QuickCell({value,options,color,C,onChange}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  return(
    <div ref={ref} style={{position:"relative",display:"inline-block"}}>
      <div onClick={e=>{e.stopPropagation();setOpen(!open);}} style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4}}>
        <Chip label={value} color={color}/>
        <span style={{fontSize:9,color:C.textDim}}>▾</span>
      </div>
      {open&&(
        <div style={{position:"absolute",top:"110%",left:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:5,zIndex:300,boxShadow:C.shadow,minWidth:130}}>
          {options.map(o=>(
            <div key={o.value} onClick={e=>{e.stopPropagation();onChange(o.value);setOpen(false);}}
              style={{padding:"7px 10px",borderRadius:7,cursor:"pointer",fontSize:12,color:o.color,fontWeight:600,transition:"all 0.12s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.accentSoft}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
// Inline quick-edit date cell for list view
function QuickDateCell({value,C,onChange}){
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  const TODAY_C="2026-03-18";const TOMORROW_C="2026-03-19";
  const color=value===TODAY_C?C.red:value===TOMORROW_C?C.yellow:C.textMuted;
  return(
    <div ref={ref} style={{position:"relative",display:"inline-block"}}>
      <div onClick={e=>{e.stopPropagation();setOpen(!open);}} style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4}}>
        <span style={{fontSize:12,color,fontWeight:value&&value<=TOMORROW_C?700:400}}>{value||"—"}</span>
        <span style={{fontSize:9,color:C.textDim}}>▾</span>
      </div>
      {open&&(
        <div style={{position:"absolute",top:"110%",left:0,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:8,zIndex:300,boxShadow:C.shadow}} onClick={e=>e.stopPropagation()}>
          <input type="date" defaultValue={value||""} onChange={e=>{onChange(e.target.value);setOpen(false);}}
            style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:7,color:C.text,fontSize:13,padding:"6px 10px",fontFamily:"inherit",cursor:"pointer"}}/>
          {value&&<button onClick={()=>{onChange("");setOpen(false);}} style={{display:"block",marginTop:5,width:"100%",padding:"5px",borderRadius:6,background:"none",border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>✕ Limpar</button>}
        </div>
      )}
    </div>
  );
}
 
export default function App(){
  const [lang,setLang]=useState("pt");
  const [theme,setTheme]=useState("dark");
  const C=theme==="dark"?DARK:LIGHT;
  const t=TXT[lang];
  const [currency,setCurrency]=useState("BRL");
  const CUR=CURRENCIES[currency];
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [view,setView]=useState("dashboard");
  const [taskView,setTaskView]=useState("kanban");
  const [filterCompany,setFilterCompany]=useState("all");
  const [readNotifs,setReadNotifs]=useState([]);
 
  const [navItems,setNavItems]=useState([
    {id:"dashboard",icon:"▣",color:"#E0E0E0"},
    {id:"tasks",    icon:"▦",color:"#4B9EFF"},
    {id:"companies",icon:"◉",color:"#1DB97A"},
    {id:"clients",  icon:"◎",color:"#F0A500"},
    {id:"financial",icon:"◈",color:"#A29BFE"},
    {id:"notif",    icon:"🔔",color:"#E05555"},
  ]);
  const [editNavItem,setEditNavItem]=useState(null);
  const [showIconPicker,setShowIconPicker]=useState(false);
  const [showColorPickerNav,setShowColorPickerNav]=useState(false);
  const [profile,setProfile]=useState({name:"Aline",emoji:"👤",role:"Admin",photo:null});
  const [showProfileMenu,setShowProfileMenu]=useState(false);
  const [showProfileEdit,setShowProfileEdit]=useState(false);
  const [editProfile,setEditProfile]=useState({name:"Aline",emoji:"👤",role:"Admin",photo:null});
  const photoInputRef=useRef(null);
  const profileRef=useRef(null);
 
  const [companies,setCompanies]=useState([
    {id:"upper",name:"Upper Agency",   icon:"🏢",color:"#4B9EFF",status:"active",projectTypes:["Site","Marca","Tráfego Pago","Social Media","SEO"]},
    {id:"zory", name:"Zory Assessoria",icon:"⚙", color:"#1DB97A",status:"active",projectTypes:["Consultoria","ClickUp Setup","Gestão de Processos","Treinamento"]},
  ]);
  const [clients,setClients]=useState([
    {id:"c1",name:"SOMA Painting",companies:["upper"],phone:"(31) 99999-1111",email:"contato@soma.com",address:"Rua das Flores, 123, Ipatinga - MG",projectTypes:["Social Media","Tráfego Pago"]},
    {id:"c2",name:"Cliente B",    companies:["upper"],phone:"(31) 99999-2222",email:"clienteb@email.com",address:"Av. Principal, 456, BH - MG",projectTypes:["Site","Marca"]},
    {id:"c3",name:"Cliente X",    companies:["zory"], phone:"(31) 99999-3333",email:"clientex@email.com",address:"Rua do Comércio, 789, Ipatinga - MG",projectTypes:["ClickUp Setup"]},
    {id:"c4",name:"Cliente Y",    companies:["zory","upper"],phone:"(31) 99999-4444",email:"clientey@email.com",address:"Av. Bandeirantes, 101, BH - MG",projectTypes:["Gestão de Processos","SEO"]},
  ]);
  const [tasks,setTasks]=useState([
    {id:1,title:"Criar proposta para SOMA",     companyId:"upper",clientId:"c1",status:"doing",priority:"high",  due:TODAY,    assignee:"Aline"},
    {id:2,title:"Publicar Stories Instagram",    companyId:"upper",clientId:"c1",status:"todo", priority:"high",  due:TOMORROW, assignee:"Aline"},
    {id:3,title:"Redesign site Cliente B",       companyId:"upper",clientId:"c2",status:"todo", priority:"medium",due:"2026-03-22",assignee:"Carlos"},
    {id:4,title:"Reunião branding Cliente B",    companyId:"upper",clientId:"c2",status:"done", priority:"low",   due:"2026-03-17",assignee:"Marina"},
    {id:5,title:"Mapear processos Cliente X",    companyId:"zory", clientId:"c3",status:"doing",priority:"high",  due:TOMORROW, assignee:"Aline"},
    {id:6,title:"Atualizar proposta Cliente Y",  companyId:"zory", clientId:"c4",status:"todo", priority:"medium",due:"2026-03-24",assignee:"Aline"},
    {id:7,title:"Follow-up ClickUp Cliente X",   companyId:"zory", clientId:"c3",status:"todo", priority:"low",   due:"2026-03-26",assignee:"Carlos"},
    {id:8,title:"Relatório mensal Upper",        companyId:"upper",clientId:"",  status:"done", priority:"medium",due:"2026-03-15",assignee:"Aline"},
  ]);
  const [entries,setEntries]=useState([
    {id:1,type:"income", companyId:"upper",clientId:"c1",amount:1500,date:TODAY,       notes:"Pagamento lavagem",currency:"BRL"},
    {id:2,type:"expense",companyId:"upper",clientId:"",  amount:300, date:TODAY,       notes:"Ferramentas Adobe",currency:"BRL"},
    {id:3,type:"income", companyId:"zory", clientId:"c3",amount:2200,date:"2026-03-17",notes:"Consultoria mensal",currency:"BRL"},
    {id:4,type:"income", companyId:"upper",clientId:"c1",amount:800, date:TODAY,       notes:"Gestão tráfego",currency:"BRL"},
  ]);
 
  const [showNewTask,    setShowNewTask]    =useState(false);
  const [showNewCompany, setShowNewCompany] =useState(false);
  const [showNewEntry,   setShowNewEntry]   =useState(false);
  const [showSettings,   setShowSettings]   =useState(false);
  const [showNewClient,  setShowNewClient]  =useState(false);
  const [showNewProjType,setShowNewProjType]=useState(false);
  const [viewClient,     setViewClient]     =useState(null);
  const [editClientId,   setEditClientId]   =useState(null);
  const [viewTask,       setViewTask]       =useState(null);
  const [editingTask,    setEditingTask]    =useState(false);
  const [editTask,       setEditTask]       =useState(null);
  const [editEntryId,    setEditEntryId]    =useState(null);
  const [showCIconPicker,setShowCIconPicker]=useState(false);
  const [showCColorPicker,setShowCColorPicker]=useState(false);
  const [newTask,    setNewTask]    =useState({title:"",companyId:"upper",clientId:"",status:"todo",priority:"medium",due:"",assignee:""});
  const [newCompany, setNewCompany] =useState({name:"",icon:"🏢",color:"#4B9EFF"});
  const [newEntry,   setNewEntry]   =useState({type:"income",companyId:"upper",clientId:"",amount:"",date:TODAY,notes:"",currency:"BRL"});
  const [newClient,  setNewClient]  =useState({name:"",companies:["upper"],phone:"",email:"",address:"",projectTypes:[]});
  const [newProjTypeName,setNewProjTypeName]=useState("");
  const [newProjTypeFor, setNewProjTypeFor] =useState("upper");
  const [dragId,      setDragId]      =useState(null);
  const [dragCalTask, setDragCalTask] =useState(null);
  const [clientFilter,setClientFilter]=useState("all");
  const [clientSearch,setClientSearch]=useState("");
  // Task date filter
  const [taskDateFilter,setTaskDateFilter]=useState("all");
  const [customDateFrom,setCustomDateFrom]=useState("");
  const [customDateTo,setCustomDateTo]=useState("");
  const [showTaskDatePicker,setShowTaskDatePicker]=useState(false);
  // Edit company in sidebar
  const [editSidebarCompany,setEditSidebarCompany]=useState(null);
  const [showSidebarIconPicker,setShowSidebarIconPicker]=useState(false);
  const [showSidebarColorPicker,setShowSidebarColorPicker]=useState(false);
  // Financial date filter
  const [finDateFilter,setFinDateFilter]=useState("all");
  const [finCustomFrom,setFinCustomFrom]=useState("");
  const [finCustomTo,setFinCustomTo]=useState("");
  const [showFinDatePicker,setShowFinDatePicker]=useState(false);
 
  useEffect(()=>{const h=e=>{if(profileRef.current&&!profileRef.current.contains(e.target))setShowProfileMenu(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
 
  const activeCompanies=companies.filter(c=>c.status==="active");
  const completedCompanies=companies.filter(c=>c.status==="completed");
  const getCompany=id=>companies.find(c=>c.id===id);
  const getClient=id=>clients.find(c=>c.id===id);
  const prioColor=p=>p==="high"?C.red:p==="medium"?C.yellow:C.green;
  const prioLabel=p=>t[p]||p;
  const statusColor=s=>s==="done"?C.green:s==="doing"?C.blue:C.textMuted;
  const statusLabel=s=>s==="done"?t.done:s==="doing"?t.doing:t.todo;
  const clientsForCompany=cid=>clients.filter(cl=>cl.companies.includes(cid));
  const companyProgress=cid=>{const ct=tasks.filter(tk=>tk.companyId===cid);return{total:ct.length,done:ct.filter(tk=>tk.status==="done").length};};
 
  const visibleTasks=(()=>{let tt=tasks.filter(tk=>activeCompanies.some(c=>c.id===tk.companyId));if(filterCompany!=="all")tt=tt.filter(tk=>tk.companyId===filterCompany);return tt;})();
  const dateFilteredTasks=visibleTasks.filter(tk=>taskMatchesDateFilter(tk));
  const todoT=dateFilteredTasks.filter(t=>t.status==="todo");
  const doingT=dateFilteredTasks.filter(t=>t.status==="doing");
  const doneT=dateFilteredTasks.filter(t=>t.status==="done");
  const totalT=visibleTasks.length;
  const donePct=totalT?Math.round((doneT.length/totalT)*100):0;
  const highN=visibleTasks.filter(t=>t.priority==="high"&&t.status!=="done").length;
  const visibleEntries=filterCompany==="all"?entries:entries.filter(e=>e.companyId===filterCompany);
  const todayE=visibleEntries.filter(e=>e.date===TODAY);
  const todayIn=todayE.filter(e=>e.type==="income").reduce((s,e)=>s+Number(e.amount),0);
  const todayOut=todayE.filter(e=>e.type==="expense").reduce((s,e)=>s+Number(e.amount),0);
  const filteredClients=clients.filter(cl=>(clientFilter==="all"||cl.companies.includes(clientFilter))&&(cl.name.toLowerCase().includes(clientSearch.toLowerCase())||cl.email.toLowerCase().includes(clientSearch.toLowerCase())));
 
  const notifTasks=tasks.filter(tk=>tk.status!=="done"&&(tk.due===TODAY||tk.due===TOMORROW)&&!readNotifs.includes(tk.id));
  const unreadCount=notifTasks.length;
 
  function addTask(){if(!newTask.title.trim())return;setTasks(p=>[...p,{...newTask,id:Date.now()}]);setNewTask({title:"",companyId:"upper",clientId:"",status:"todo",priority:"medium",due:"",assignee:""});setShowNewTask(false);}
  function deleteTask(id){setTasks(tt=>tt.filter(x=>x.id!==id));if(viewTask?.id===id)setViewTask(null);}
  function updateTask(id,patch){setTasks(tt=>tt.map(x=>x.id===id?{...x,...patch}:x));if(viewTask?.id===id)setViewTask(v=>({...v,...patch}));}
  function saveTask(){if(!editTask?.title.trim())return;setTasks(tt=>tt.map(x=>x.id===editTask.id?editTask:x));setViewTask(editTask);setEditingTask(false);}
  function addCompany(){if(!newCompany.name.trim())return;const id=newCompany.name.toLowerCase().replace(/\s+/g,"-")+Date.now();setCompanies(c=>[...c,{id,name:newCompany.name,icon:newCompany.icon,color:newCompany.color,status:"active",projectTypes:[]}]);setNewCompany({name:"",icon:"🏢",color:"#4B9EFF"});setShowNewCompany(false);}
  function concludeCompany(id){setCompanies(c=>c.map(x=>x.id===id?{...x,status:"completed"}:x));if(filterCompany===id)setFilterCompany("all");}
  function deleteCompany(id){setCompanies(c=>c.filter(x=>x.id!==id));setTasks(tt=>tt.filter(x=>x.companyId!==id));if(filterCompany===id)setFilterCompany("all");}
  function addProjectType(){if(!newProjTypeName.trim())return;setCompanies(c=>c.map(x=>x.id===newProjTypeFor?{...x,projectTypes:[...x.projectTypes,newProjTypeName.trim()]}:x));setNewProjTypeName("");setShowNewProjType(false);}
  function addEntry(){if(!newEntry.amount)return;setEntries(e=>[...e,{...newEntry,id:Date.now(),amount:Number(newEntry.amount)}]);setNewEntry({type:"income",companyId:"upper",clientId:"",amount:"",date:TODAY,notes:"",currency:"BRL"});setShowNewEntry(false);}
  function saveEntry(updated){setEntries(e=>e.map(x=>x.id===updated.id?updated:x));setEditEntryId(null);}
  function addClient(){if(!newClient.name.trim())return;setClients(c=>[...c,{...newClient,id:"cl"+Date.now()}]);setNewClient({name:"",companies:["upper"],phone:"",email:"",address:"",projectTypes:[]});setShowNewClient(false);}
  function deleteClient(id){setClients(c=>c.filter(x=>x.id!==id));}
  function saveClient(updated){setClients(c=>c.map(x=>x.id===updated.id?updated:x));setViewClient(updated);setEditClientId(null);}
  function dropOnCalDay(ds){if(!dragCalTask)return;updateTask(dragCalTask,{due:ds});setDragCalTask(null);}
 
  // Date filter helpers
  function getNext7(){const d=new Date(TODAY);d.setDate(d.getDate()+6);return d.toISOString().slice(0,10);}
  function taskMatchesDateFilter(tk){
    if(taskDateFilter==="all")return true;
    if(!tk.due)return taskDateFilter==="all";
    if(taskDateFilter==="today")return tk.due===TODAY;
    if(taskDateFilter==="tomorrow")return tk.due===TOMORROW;
    if(taskDateFilter==="week")return tk.due>=TODAY&&tk.due<=getNext7();
    if(taskDateFilter==="custom"){
      if(customDateFrom&&customDateTo)return tk.due>=customDateFrom&&tk.due<=customDateTo;
      if(customDateFrom)return tk.due===customDateFrom;
      return true;
    }
    return true;
  }
  function entryMatchesDateFilter(e){
    if(finDateFilter==="all")return true;
    if(finDateFilter==="today")return e.date===TODAY;
    if(finDateFilter==="tomorrow")return e.date===TOMORROW;
    if(finDateFilter==="week")return e.date>=TODAY&&e.date<=getNext7();
    if(finDateFilter==="custom"){
      if(finCustomFrom&&finCustomTo)return e.date>=finCustomFrom&&e.date<=finCustomTo;
      if(finCustomFrom)return e.date===finCustomFrom;
      return true;
    }
    return true;
  }
  function saveSidebarCompany(){
    if(!editSidebarCompany)return;
    setCompanies(c=>c.map(x=>x.id===editSidebarCompany.id?{...x,name:editSidebarCompany.name,icon:editSidebarCompany.icon,color:editSidebarCompany.color}:x));
    setEditSidebarCompany(null);setShowSidebarIconPicker(false);setShowSidebarColorPicker(false);
  }
 
  const firstDay=new Date(2026,2,1).getDay();
  const daysInMonth=31;
  const monthName=new Date(2026,2,1).toLocaleString(lang==="pt"?"pt-BR":lang==="es"?"es-ES":"en-US",{month:"long",year:"numeric"});
  const ganttDays=Array.from({length:14},(_,i)=>{const d=new Date("2026-03-15");d.setDate(d.getDate()+i);return d.toISOString().slice(0,10);});
  const navLabel=id=>t[id]||id;
 
  const statusOptions=[{value:"todo",label:t.todo,color:C.textMuted},{value:"doing",label:t.doing,color:C.blue},{value:"done",label:t.done,color:C.green}];
  const prioOptions=[{value:"high",label:t.high,color:C.red},{value:"medium",label:t.medium,color:C.yellow},{value:"low",label:t.low,color:C.green}];
 
  const sideW=sidebarOpen?236:0;
 
  return(
    <div style={{fontFamily:"'Inter',sans-serif",background:C.bg,minHeight:"100vh",color:C.text,display:"flex",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
        input,select,textarea{outline:none;font-family:'Inter',sans-serif;}
        .ni{transition:all 0.18s;cursor:pointer;border-left:2px solid transparent;}
        .ni:hover{background:${C.accentSoft}!important;}
        .na{background:${C.accentSoft}!important;border-left:2px solid currentColor!important;}
        .tc{transition:transform 0.13s,box-shadow 0.13s,border-color 0.13s;cursor:pointer;}
        .tc:hover{transform:translateY(-2px);box-shadow:${C.shadow};border-color:${C.accent}!important;}
        .mc{transition:transform 0.18s;}.mc:hover{transform:translateY(-2px);}
        .dz{transition:background 0.15s,border-color 0.15s;}.dz.ov{background:${C.accentSoft}!important;border-color:${C.accent}!important;}
        .cd{transition:all 0.13s;}.cd:hover{background:${C.accentSoft}!important;cursor:pointer;}.cd.dov{background:${C.accentSoft}!important;border-color:${C.accent}!important;}
        .db{opacity:0;transition:opacity 0.15s;}.tc:hover .db{opacity:1;}
        .er:hover{background:${C.accentSoft}!important;}
        .pb:hover{background:${C.accentSoft}!important;border-radius:10px;}
        .ci:hover{background:${C.accentSoft}!important;border-radius:8px;}
        .tr{transition:all 0.13s;}.tr:hover{background:${C.accentSoft}!important;}
        .nib:hover{background:${C.accentSoft}!important;border-radius:6px;}
        .cbx{width:16px;height:16px;border-radius:4px;border:1.5px solid ${C.border};background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;flex-shrink:0;}
        .cbx:hover{border-color:${C.green}!important;}
        @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi 0.2s ease;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}.pulse{animation:pulse 1.5s infinite;}
        .vt{padding:6px 12px;border-radius:8px;border:1px solid;cursor:pointer;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;transition:all 0.15s;}
        .sidebar-transition{transition:width 0.25s ease,opacity 0.25s ease;}
        .toggle-btn{position:fixed;top:18px;z-index:200;background:${C.surface};border:1px solid ${C.border};border-radius:8px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;color:${C.textMuted};transition:all 0.2s;}
        .toggle-btn:hover{background:${C.accentSoft};color:${C.accent};}
      `}</style>
 
      {/* Sidebar toggle */}
      <button className="toggle-btn" onClick={()=>setSidebarOpen(o=>!o)} style={{left:sidebarOpen?244:8}}>
        {sidebarOpen?"◀":"▶"}
      </button>
 
      {/* SIDEBAR */}
      <div className="sidebar-transition" style={{width:sidebarOpen?236:0,overflow:"hidden",flexShrink:0}}>
        <aside style={{width:236,background:C.surface,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",height:"100vh",position:"sticky",top:0}}>
          {/* Logo */}
          <div style={{padding:"18px 16px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,background:C.accent,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:C.bg,flexShrink:0}}>UZ</div>
            <div><div style={{fontSize:16,fontWeight:700,color:C.text}}>UZ Company</div><div style={{fontSize:10,color:C.textMuted}}>Workspace Pro</div></div>
          </div>
 
          {/* Filter */}
          <div style={{padding:"9px 12px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:9,color:C.textDim,fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:5}}>{t.filterCompany}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {["all",...activeCompanies.map(c=>c.id)].map(id=>{const co=id==="all"?null:getCompany(id);const active=filterCompany===id;return(<button key={id} onClick={()=>setFilterCompany(id)} style={{padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,border:`1px solid ${active?(co?.color||C.accent):C.border}`,background:active?(co?`${co.color}18`:C.accentSoft):"transparent",color:active?(co?.color||C.accent):C.textMuted,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>{id==="all"?t.allCompanies:(co?.icon+" "+co?.name.split(" ")[0])}</button>);})}</div>
          </div>
 
          {/* Nav */}
          <nav style={{padding:"10px 8px",flex:1,overflowY:"auto"}}>
            {navItems.map(item=>{
              const isActive=view===item.id;
              const badge=item.id==="notif"&&unreadCount>0;
              return(
                <div key={item.id} style={{position:"relative",marginBottom:2}}>
                  <div className={`ni ${isActive?"na":""}`} onClick={()=>setView(item.id)}
                    style={{display:"flex",alignItems:"center",gap:9,padding:"9px 10px",borderRadius:8,color:isActive?item.color:C.textMuted,fontSize:13,fontWeight:500}}>
                    <span style={{fontSize:15,width:20,textAlign:"center",flexShrink:0}}>{item.icon}</span>
                    <span style={{flex:1}}>{navLabel(item.id)}</span>
                    {badge&&<span className="pulse" style={{width:18,height:18,borderRadius:"50%",background:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",flexShrink:0}}>{unreadCount}</span>}
                    <button className="db" onClick={e=>{e.stopPropagation();setEditNavItem({...item});setShowIconPicker(false);setShowColorPickerNav(false);}}
                      style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:11,padding:"0 2px",lineHeight:1}}>✎</button>
                  </div>
                </div>
              );
            })}
            <div style={{marginTop:14,marginBottom:5,padding:"0 10px",fontSize:9,color:C.textDim,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{t.companies}</div>
            {activeCompanies.map(c=>{const p=companyProgress(c.id);return(<div key={c.id} className="ci" style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",cursor:"pointer",marginBottom:2,borderRadius:8,transition:"all 0.15s",position:"relative"}} onMouseEnter={e=>e.currentTarget.classList.add("hov")} onMouseLeave={e=>e.currentTarget.classList.remove("hov")}>
              <span style={{fontSize:14,flexShrink:0}} onClick={()=>{setView("tasks");setFilterCompany(c.id);}}>{c.icon}</span>
              <span style={{fontSize:12,color:C.textMuted,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} onClick={()=>{setView("tasks");setFilterCompany(c.id);}}>{c.name}</span>
              <span style={{fontSize:10,color:C.textDim}} onClick={()=>{setView("tasks");setFilterCompany(c.id);}}>{p.done}/{p.total}</span>
              <button className="db" onClick={e=>{e.stopPropagation();setEditSidebarCompany({...c});setShowSidebarIconPicker(false);setShowSidebarColorPicker(false);}}
                style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:11,padding:"0 2px",lineHeight:1,flexShrink:0}}>✎</button>
            </div>);})}
          </nav>
 
          {/* Profile */}
          <div style={{padding:"11px 13px",borderTop:`1px solid ${C.border}`,position:"relative"}} ref={profileRef}>
            <div className="pb" onClick={()=>setShowProfileMenu(!showProfileMenu)} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",padding:"6px 8px",transition:"all 0.18s"}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.textMuted})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:profile.photo?0:16,flexShrink:0,overflow:"hidden"}}>
                {profile.photo?<img src={profile.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:profile.emoji}
              </div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.text}}>{profile.name}</div><div style={{fontSize:10,color:C.textMuted}}>{profile.role}</div></div>
              <span style={{fontSize:13,color:C.textMuted}}>⚙</span>
            </div>
            {showProfileMenu&&(
              <div className="fi" style={{position:"absolute",bottom:64,left:8,right:8,background:C.card,border:`1px solid ${C.border}`,borderRadius:11,padding:6,zIndex:300,boxShadow:C.shadow}}>
                {[["✎ "+t.editProfile,()=>{setEditProfile({...profile});setShowProfileEdit(true);setShowProfileMenu(false);}],["⚙ "+t.settings,()=>{setShowSettings(true);setShowProfileMenu(false);}]].map(([label,fn])=>(<div key={label} onClick={fn} style={{padding:"9px 11px",borderRadius:8,cursor:"pointer",fontSize:13,color:C.text,transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.accentSoft} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{label}</div>))}
              </div>
            )}
          </div>
        </aside>
      </div>
 
      {/* MAIN */}
      <div style={{flex:1,overflow:"auto",transition:"all 0.25s",paddingLeft:sidebarOpen?28:48}}>
        {/* Topbar */}
        <div style={{padding:"15px 26px 15px 0",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.surface,position:"sticky",top:0,zIndex:10}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <h1 style={{fontSize:20,fontWeight:700,color:C.text}}>{navLabel(view)}</h1>
              {filterCompany!=="all"&&(()=>{const co=getCompany(filterCompany);return co?<span style={{fontSize:10,padding:"2px 9px",borderRadius:20,fontWeight:600,background:`${co.color}18`,color:co.color,border:`1px solid ${co.color}33`}}>{co.icon} {co.name}</span>:null;})()}
            </div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:1}}>{new Date().toLocaleDateString(lang==="pt"?"pt-BR":lang==="es"?"es-ES":"en-US",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <div style={{display:"flex",gap:8,paddingRight:26}}>
            {view==="companies" &&<button onClick={()=>setShowNewCompany(true)} style={{padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer",fontFamily:"inherit"}}>+ {t.newCompany}</button>}
            {view==="clients"   &&<button onClick={()=>setShowNewClient(true)}  style={{padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:600,background:C.accent,border:"none",color:C.bg,cursor:"pointer",fontFamily:"inherit"}}>+ {t.newClient}</button>}
            {view==="financial" &&<button onClick={()=>setShowNewEntry(true)}   style={{padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer",fontFamily:"inherit"}}>+ {t.newEntry}</button>}
            {(view==="dashboard"||view==="tasks")&&<button onClick={()=>setShowNewTask(true)} style={{padding:"8px 15px",borderRadius:9,fontSize:13,fontWeight:600,background:C.accent,border:"none",color:C.bg,cursor:"pointer",fontFamily:"inherit"}}>+ {t.newTask}</button>}
          </div>
        </div>
 
        <div style={{padding:"20px 26px 20px 0"}}>
 
          {/* DASHBOARD */}
          {view==="dashboard"&&(
            <div className="fi">
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
                {[{label:t.totalTasks,val:totalT,sub:"",color:C.accent,icon:"▣"},{label:t.completed,val:`${donePct}%`,sub:`${doneT.length}`,color:C.green,icon:"✓"},{label:t.inProgress,val:doingT.length,sub:"",color:C.blue,icon:"↻"},{label:t.highPri,val:highN,sub:"",color:C.red,icon:"!"}].map((m,i)=>(
                  <div key={i} className="mc" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{fontSize:11,color:C.textMuted,fontWeight:500,marginBottom:6}}>{m.label}</div><div style={{width:24,height:24,borderRadius:7,background:`${m.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:m.color,fontWeight:700}}>{m.icon}</div></div>
                    <div style={{fontSize:26,fontWeight:700,color:m.color}}>{m.val}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                {[{label:t.incomeToday,val:todayIn,type:"income",color:C.green,icon:"↑"},{label:t.expenseToday,val:todayOut,type:"expense",color:C.red,icon:"↓"}].map((m,i)=>(
                  <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}><span style={{fontSize:12,color:C.textMuted,fontWeight:500}}>{m.label}</span><div style={{width:24,height:24,borderRadius:7,background:`${m.color}18`,display:"flex",alignItems:"center",justifyContent:"center",color:m.color,fontWeight:700,fontSize:12}}>{m.icon}</div></div>
                    <div style={{fontSize:22,fontWeight:700,color:m.color,marginBottom:7}}>{CUR.symbol} {m.val.toLocaleString()}</div>
                    {todayE.filter(e=>e.type===m.type).map(e=>{const co=getCompany(e.companyId);const cl=getClient(e.clientId);const ec=CURRENCIES[e.currency]||CUR;return(<div key={e.id} style={{display:"flex",justifyContent:"space-between",fontSize:11,marginTop:3}}><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:5,height:5,borderRadius:1,background:co?.color}}/><span style={{color:C.textMuted}}>{cl?.name||co?.name}</span></div><span style={{color:m.color,fontWeight:600}}>{ec.symbol} {Number(e.amount).toLocaleString()}</span></div>);})}
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}><h3 style={{fontSize:11,fontWeight:600,color:C.textMuted,marginBottom:11,textTransform:"uppercase",letterSpacing:0.5}}>{t.progressByCompany}</h3>{activeCompanies.map(c=>{const p=companyProgress(c.id);const pct=p.total?Math.round((p.done/p.total)*100):0;return(<div key={c.id} style={{marginBottom:11}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:500,color:C.text}}>{c.icon} {c.name}</span><span style={{fontSize:11,color:C.textMuted}}>{p.done}/{p.total}</span></div><div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:c.color,borderRadius:3,transition:"width 0.8s"}}/></div></div>);})}</div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}><h3 style={{fontSize:11,fontWeight:600,color:C.textMuted,marginBottom:11,textTransform:"uppercase",letterSpacing:0.5}}>{t.recentTasks}</h3>{visibleTasks.slice(0,6).map(tk=>{const co=getCompany(tk.companyId);const cl=getClient(tk.clientId);return(<div key={tk.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:`1px solid ${C.border}`}}><div style={{width:6,height:6,borderRadius:2,background:co?.color,flexShrink:0}}/><span style={{fontSize:12,flex:1,color:tk.status==="done"?C.textMuted:C.text,textDecoration:tk.status==="done"?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tk.title}</span>{cl&&<Chip label={cl.name} color={co?.color||C.accent}/>}</div>);})}</div>
              </div>
            </div>
          )}
 
          {/* TASKS */}
          {view==="tasks"&&(
            <div className="fi">
              {/* Date filter bar */}
              <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center",flexWrap:"wrap"}}>
                {[{key:"all",label:"Todas"},{key:"today",label:"Hoje"},{key:"tomorrow",label:"Amanhã"},{key:"week",label:"Próx. 7 dias"},{key:"custom",label:"Personalizado"}].map(f=>(
                  <button key={f.key} onClick={()=>{setTaskDateFilter(f.key);if(f.key==="custom")setShowTaskDatePicker(true);else setShowTaskDatePicker(false);}}
                    style={{padding:"5px 13px",borderRadius:20,fontSize:12,fontWeight:600,border:`1px solid ${taskDateFilter===f.key?C.accent:C.border}`,background:taskDateFilter===f.key?C.accentSoft:"transparent",color:taskDateFilter===f.key?C.accent:C.textMuted,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>
                    {f.label}
                  </button>
                ))}
                {taskDateFilter==="custom"&&(
                  <div style={{display:"flex",alignItems:"center",gap:7,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"5px 10px"}}>
                    <input type="date" value={customDateFrom} onChange={e=>setCustomDateFrom(e.target.value)}
                      style={{background:"transparent",border:"none",color:C.text,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}/>
                    <span style={{color:C.textMuted,fontSize:12}}>→</span>
                    <input type="date" value={customDateTo} onChange={e=>setCustomDateTo(e.target.value)}
                      style={{background:"transparent",border:"none",color:C.text,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}/>
                    {(customDateFrom||customDateTo)&&<button onClick={()=>{setCustomDateFrom("");setCustomDateTo("");}} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:13,padding:0}}>×</button>}
                  </div>
                )}
                {taskDateFilter!=="all"&&<span style={{fontSize:11,color:C.textMuted}}>{dateFilteredTasks.length} tarefa{dateFilteredTasks.length!==1?"s":""}</span>}
              </div>
              <div style={{display:"flex",gap:7,marginBottom:16,background:C.card,padding:5,borderRadius:10,border:`1px solid ${C.border}`,width:"fit-content"}}>
                {[{key:"kanban",icon:"▦",label:t.kanban},{key:"list",icon:"☰",label:t.list},{key:"calendar",icon:"◫",label:t.calendar},{key:"gantt",icon:"▬",label:t.gantt}].map(vt=>(
                  <button key={vt.key} className="vt" onClick={()=>setTaskView(vt.key)} style={{borderColor:taskView===vt.key?C.accent:C.border,background:taskView===vt.key?C.accentSoft:"transparent",color:taskView===vt.key?C.accent:C.textMuted}}>{vt.icon} {vt.label}</button>
                ))}
              </div>
 
              {/* KANBAN */}
              {taskView==="kanban"&&(
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,alignItems:"start"}}>
                  {[{key:"todo",label:t.todo,dot:C.textMuted,col:todoT},{key:"doing",label:t.doing,dot:C.blue,col:doingT},{key:"done",label:t.done,dot:C.green,col:doneT}].map(col=>(
                    <div key={col.key} className="dz" onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("ov");}} onDragLeave={e=>e.currentTarget.classList.remove("ov")} onDrop={e=>{e.currentTarget.classList.remove("ov");if(dragId!=null){updateTask(dragId,{status:col.key});setDragId(null);}}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:12,minHeight:280}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:7,height:7,borderRadius:"50%",background:col.dot}}/><span style={{fontSize:11,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.6}}>{col.label}</span></div>
                        <span style={{fontSize:11,background:C.border,padding:"1px 7px",borderRadius:20,color:C.textMuted}}>{col.col.length}</span>
                      </div>
                      {col.col.map(tk=>{const co=getCompany(tk.companyId);const cl=getClient(tk.clientId);return(
                        <div key={tk.id} className="tc" draggable onDragStart={e=>{e.stopPropagation();setDragId(tk.id);}} onClick={()=>{setViewTask(tk);setEditTask({...tk});setEditingTask(false);}} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:11,marginBottom:8,position:"relative"}}>
                          <button className="db" onClick={e=>{e.stopPropagation();deleteTask(tk.id);}} style={{position:"absolute",top:7,right:7,background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:15,padding:0,lineHeight:1}}>×</button>
                          <div style={{fontSize:13,fontWeight:500,color:C.text,lineHeight:1.4,paddingRight:16,marginBottom:7}}>{tk.title}</div>
                          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:5}}>
                            {co&&<Chip label={co.icon+" "+co.name} color={co.color}/>}
                            {cl&&<Chip label={cl.name} color={C.textMuted} bg={C.border}/>}
                            <Chip label={prioLabel(tk.priority)} color={prioColor(tk.priority)}/>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            {tk.assignee&&<><div style={{width:15,height:15,borderRadius:"50%",background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:C.bg}}>{tk.assignee[0]}</div><span style={{fontSize:11,color:C.textMuted,flex:1}}>{tk.assignee}</span></>}
                            {tk.due&&<span style={{fontSize:10,color:tk.due===TODAY?C.red:tk.due===TOMORROW?C.yellow:C.textDim,marginLeft:"auto",fontWeight:tk.due<=TOMORROW?700:400}}>{tk.due.slice(5)}</span>}
                          </div>
                        </div>
                      );})}
                      <button onClick={()=>{setShowNewTask(true);setNewTask(n=>({...n,status:col.key}));}} style={{width:"100%",padding:"6px",background:"none",border:`1px dashed ${C.border}`,borderRadius:7,color:C.textDim,cursor:"pointer",fontSize:12,marginTop:2,fontFamily:"inherit",transition:"all 0.15s"}} onMouseEnter={e=>{e.target.style.borderColor=C.accent;e.target.style.color=C.accent;}} onMouseLeave={e=>{e.target.style.borderColor=C.border;e.target.style.color=C.textDim;}}>+ {t.newTask}</button>
                    </div>
                  ))}
                </div>
              )}
 
              {/* LIST */}
              {taskView==="list"&&(
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                  <div style={{display:"grid",gridTemplateColumns:"28px 2.2fr 1.1fr 0.9fr 1fr 1fr 0.8fr auto",padding:"9px 14px",borderBottom:`1px solid ${C.border}`,background:C.surface,gap:8}}>
                    {["",t.title,t.company,t.client,t.status,t.priority,t.due,""].map((h,i)=><div key={i} style={{fontSize:10,fontWeight:600,color:C.textDim,textTransform:"uppercase",letterSpacing:0.6}}>{h}</div>)}
                  </div>
                  {dateFilteredTasks.length===0&&<div style={{padding:32,textAlign:"center",color:C.textDim,fontSize:13}}>{t.noTask}</div>}
                  {dateFilteredTasks.map(tk=>{
                    const co=getCompany(tk.companyId);const cl=getClient(tk.clientId);
                    const isDone=tk.status==="done";
                    return(
                      <div key={tk.id} className="tr" style={{display:"grid",gridTemplateColumns:"28px 2.2fr 1.1fr 0.9fr 1fr 1fr 0.8fr auto",padding:"10px 14px",borderBottom:`1px solid ${C.border}`,alignItems:"center",gap:8,transition:"all 0.13s",opacity:isDone?0.5:1}}>
                        {/* Checkbox */}
                        <div className="cbx" onClick={()=>updateTask(tk.id,{status:isDone?"todo":"done"})} style={{borderColor:isDone?C.green:C.border,background:isDone?`${C.green}20`:"transparent"}}>
                          {isDone&&<span style={{color:C.green,fontSize:11,fontWeight:700}}>✓</span>}
                        </div>
                        {/* Title - click opens full detail */}
                        <span onClick={()=>{setViewTask(tk);setEditTask({...tk});setEditingTask(false);}} style={{fontSize:13,fontWeight:500,color:isDone?C.textMuted:C.text,textDecoration:isDone?"line-through":"none",cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tk.title}</span>
                        {/* Company */}
                        {co?<Chip label={co.icon+" "+co.name.split(" ")[0]} color={co.color}/>:<span style={{color:C.textDim}}>—</span>}
                        {/* Client */}
                        {cl?<Chip label={cl.name} color={C.textMuted} bg={C.border}/>:<span style={{color:C.textDim}}>—</span>}
                        {/* Status quick edit */}
                        <QuickCell value={statusLabel(tk.status)} options={statusOptions} color={statusColor(tk.status)} C={C} onChange={val=>updateTask(tk.id,{status:val})}/>
                        {/* Priority quick edit */}
                        <QuickCell value={prioLabel(tk.priority)} options={prioOptions} color={prioColor(tk.priority)} C={C} onChange={val=>updateTask(tk.id,{priority:val})}/>
                        {/* Due quick edit */}
                        <QuickDateCell value={tk.due} C={C} onChange={val=>updateTask(tk.id,{due:val})}/>
                        {/* Delete */}
                        <button onClick={()=>deleteTask(tk.id)} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:14,opacity:0.4}} onMouseEnter={e=>e.target.style.opacity="1"} onMouseLeave={e=>e.target.style.opacity="0.4"}>×</button>
                      </div>
                    );
                  })}
                </div>
              )}
 
              {/* CALENDAR */}
              {taskView==="calendar"&&(
                <div>
                  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
                    <h2 style={{fontSize:17,fontWeight:600,marginBottom:13,textTransform:"capitalize",color:C.text}}>{monthName}</h2>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:4}}>
                      {(lang==="pt"?["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"]:lang==="es"?["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]).map(d=><div key={d} style={{textAlign:"center",fontSize:10,color:C.textMuted,fontWeight:600,padding:"3px 0"}}>{d}</div>)}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
                      {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`}/>)}
                      {Array.from({length:daysInMonth}).map((_,i)=>{
                        const day=i+1;const ds=`2026-03-${String(day).padStart(2,"0")}`;const isToday=day===18;
                        const dayTasks=visibleTasks.filter(tk=>tk.due===ds);
                        return(
                          <div key={day} className="cd" onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("dov");}} onDragLeave={e=>e.currentTarget.classList.remove("dov")} onDrop={e=>{e.currentTarget.classList.remove("dov");dropOnCalDay(ds);}} style={{minHeight:68,padding:"5px 5px",borderRadius:7,background:isToday?C.accentSoft:"transparent",border:`1px solid ${isToday?C.accent:C.border}`}}>
                            <div style={{fontSize:11,fontWeight:isToday?700:400,color:isToday?C.accent:C.text,marginBottom:3}}>{day}</div>
                            {dayTasks.map(tk=>{const co=getCompany(tk.companyId);return(<div key={tk.id} draggable onDragStart={()=>setDragCalTask(tk.id)} onClick={()=>{setViewTask(tk);setEditTask({...tk});setEditingTask(false);}} style={{fontSize:9,padding:"2px 4px",borderRadius:3,background:`${co?.color||C.accent}22`,color:co?.color||C.accent,marginBottom:2,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"grab"}}>{tk.title}</div>);})}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{marginTop:8,fontSize:11,color:C.textMuted,textAlign:"center"}}>{t.dragHint}</div>
                </div>
              )}
 
              {/* GANTT */}
              {taskView==="gantt"&&(
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"auto"}}>
                  <div style={{minWidth:700}}>
                    <div style={{display:"grid",gridTemplateColumns:`180px repeat(${ganttDays.length},1fr)`,borderBottom:`1px solid ${C.border}`,background:C.surface,position:"sticky",top:0,zIndex:2}}>
                      <div style={{padding:"9px 12px",fontSize:10,fontWeight:600,color:C.textDim,textTransform:"uppercase",letterSpacing:0.7}}>{t.title}</div>
                      {ganttDays.map(d=>{const isT=d===TODAY;const day=parseInt(d.slice(8));return(<div key={d} style={{padding:"9px 3px",fontSize:10,textAlign:"center",color:isT?C.accent:C.textMuted,fontWeight:isT?700:400,borderLeft:`1px solid ${C.border}`,background:isT?C.accentSoft:"transparent"}}>{day}</div>);})}
                    </div>
                    {visibleTasks.filter(tk=>tk.due).map((tk,ri)=>{const co=getCompany(tk.companyId);const dueIdx=ganttDays.indexOf(tk.due);return(
                      <div key={tk.id} style={{display:"grid",gridTemplateColumns:`180px repeat(${ganttDays.length},1fr)`,borderBottom:`1px solid ${C.border}`,background:ri%2===0?C.surface:C.card}} onClick={()=>{setViewTask(tk);setEditTask({...tk});setEditingTask(false);}}>
                        <div style={{padding:"9px 12px",fontSize:12,color:C.text,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"}}>{tk.title}</div>
                        {ganttDays.map((d,di)=>{const isBar=di===dueIdx;const isT=d===TODAY;return(<div key={d} style={{borderLeft:`1px solid ${C.border}`,padding:"7px 3px",background:isT?C.accentSoft:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{isBar&&<div style={{width:"80%",height:14,borderRadius:5,background:co?.color||C.accent,opacity:0.85,cursor:"pointer"}} title={tk.due}/>}</div>);})}
                      </div>
                    );})}
                    {visibleTasks.filter(tk=>tk.due).length===0&&<div style={{padding:32,textAlign:"center",color:C.textDim,fontSize:13}}>{t.noGantt}</div>}
                  </div>
                </div>
              )}
            </div>
          )}
 
          {/* COMPANIES */}
          {view==="companies"&&(
            <div className="fi">
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:13,marginBottom:18}}>
                {activeCompanies.map(c=>{const p=companyProgress(c.id);const pct=p.total?Math.round((p.done/p.total)*100):0;return(
                  <div key={c.id} className="mc" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:42,height:42,borderRadius:11,background:`${c.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:c.color}}>{c.icon}</div><div><div style={{fontSize:16,fontWeight:700,color:C.text}}>{c.name}</div><div style={{fontSize:11,color:C.textMuted}}>{p.total} {t.tasks.toLowerCase()} · {clientsForCompany(c.id).length} {t.clients.toLowerCase()}</div></div></div>
                      <Chip label={t.active} color={c.color}/>
                    </div>
                    <div style={{marginBottom:11}}><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:0.8,textTransform:"uppercase",marginBottom:6}}>{t.projectTypes}</div><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{c.projectTypes.map(pt=><span key={pt} style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:C.surface,color:C.textMuted,border:`1px solid ${C.border}`}}>{pt}</span>)}<button onClick={()=>{setNewProjTypeFor(c.id);setShowNewProjType(true);}} style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:"transparent",color:C.accent,border:`1px dashed ${C.accent}`,cursor:"pointer",fontFamily:"inherit"}}>{t.addType}</button></div></div>
                    <div style={{marginBottom:13}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:C.textMuted}}>{pct}%</span><span style={{fontSize:11,color:C.textMuted}}>{p.done}/{p.total}</span></div><div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:c.color,borderRadius:3}}/></div></div>
                    <div style={{display:"flex",gap:7}}><button onClick={()=>{setFilterCompany(c.id);setView("tasks");}} style={{flex:1,padding:"7px",borderRadius:7,background:C.accentSoft,border:`1px solid ${C.accent}22`,color:C.accent,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit"}}>{t.viewTasks}</button><button onClick={()=>concludeCompany(c.id)} style={{padding:"7px 11px",borderRadius:7,background:`${C.green}15`,border:`1px solid ${C.green}44`,color:C.green,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>✓</button><button onClick={()=>deleteCompany(c.id)} style={{padding:"7px 11px",borderRadius:7,background:`${C.red}15`,border:`1px solid ${C.red}44`,color:C.red,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>✕</button></div>
                  </div>
                );})}
                <div className="mc" onClick={()=>setShowNewCompany(true)} style={{background:"transparent",border:`1px dashed ${C.border}`,borderRadius:12,padding:18,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,minHeight:180}}><div style={{width:42,height:42,borderRadius:11,background:C.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:C.accent}}>+</div><span style={{fontSize:13,color:C.textMuted,fontWeight:500}}>+ {t.newCompany}</span></div>
              </div>
              {completedCompanies.length>0&&<><h3 style={{fontSize:11,fontWeight:600,color:C.textMuted,marginBottom:9,textTransform:"uppercase",letterSpacing:0.5}}>{t.completedCompanies}</h3><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>{completedCompanies.map(c=><div key={c.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:11,padding:13,opacity:0.5}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}><span>{c.icon}</span><span style={{fontSize:13,fontWeight:600,color:C.textMuted}}>{c.name}</span></div><button onClick={()=>deleteCompany(c.id)} style={{padding:"4px 9px",borderRadius:7,background:`${C.red}15`,border:`1px solid ${C.red}44`,color:C.red,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{t.deleteCompany}</button></div>)}</div></>}
            </div>
          )}
 
          {/* CLIENTS */}
          {view==="clients"&&(
            <div className="fi">
              <div style={{display:"flex",gap:9,marginBottom:12,alignItems:"center"}}>
                <input value={clientSearch} onChange={e=>setClientSearch(e.target.value)} placeholder={t.searchClient} style={{...inp(C),width:200,padding:"7px 12px"}}/>
                <div style={{display:"flex",gap:5}}>{["all",...activeCompanies.map(c=>c.id)].map(id=>{const co=id==="all"?null:getCompany(id);const active=clientFilter===id;return(<button key={id} onClick={()=>setClientFilter(id)} style={{padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:600,border:`1px solid ${active?(co?.color||C.accent):C.border}`,background:active?(co?`${co.color}18`:C.accentSoft):"transparent",color:active?(co?.color||C.accent):C.textMuted,cursor:"pointer",fontFamily:"inherit"}}>{id==="all"?t.allClients:(co?.icon+" "+co?.name.split(" ")[0])}</button>);})}</div>
                <span style={{fontSize:12,color:C.textMuted,marginLeft:"auto"}}>{filteredClients.length}</span>
              </div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1.4fr 1.6fr 1.2fr 1fr auto",padding:"9px 15px",borderBottom:`1px solid ${C.border}`,background:C.surface}}>
                  {["Nome",t.phone,t.email,t.companies2,t.projectsCol,""].map((h,i)=><div key={i} style={{fontSize:10,fontWeight:600,color:C.textDim,textTransform:"uppercase",letterSpacing:0.6}}>{h}</div>)}
                </div>
                {filteredClients.length===0&&<div style={{padding:32,textAlign:"center",color:C.textDim,fontSize:13}}>{t.noClient}</div>}
                {filteredClients.map(cl=>(
                  <div key={cl.id} className="tr" style={{display:"grid",gridTemplateColumns:"2fr 1.4fr 1.6fr 1.2fr 1fr auto",padding:"11px 15px",borderBottom:`1px solid ${C.border}`,alignItems:"center",cursor:"pointer"}} onClick={()=>setViewClient(cl)}>
                    <div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{cl.name}</div><div style={{fontSize:11,color:C.textDim,marginTop:1}}>{cl.address}</div></div>
                    <div style={{fontSize:12,color:C.textMuted}}>{cl.phone||"—"}</div>
                    <div style={{fontSize:12,color:C.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cl.email||"—"}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{cl.companies.map(cid=>{const co=getCompany(cid);return co?<Chip key={cid} label={co.icon+" "+co.name.split(" ")[0]} color={co.color}/>:null;})}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3}}>{cl.projectTypes.slice(0,2).map(pt=><span key={pt} style={{fontSize:10,padding:"1px 6px",borderRadius:20,background:C.border,color:C.textMuted}}>{pt}</span>)}{cl.projectTypes.length>2&&<span style={{fontSize:10,color:C.textDim}}>+{cl.projectTypes.length-2}</span>}</div>
                    <button onClick={e=>{e.stopPropagation();deleteClient(cl.id);}} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:14,opacity:0.4}} onMouseEnter={e=>e.target.style.opacity="1"} onMouseLeave={e=>e.target.style.opacity="0.4"}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* FINANCIAL */}
          {view==="financial"&&(
            <div className="fi">
              {/* Date filter */}
              <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:11,color:C.textMuted,fontWeight:600}}>Período:</span>
                {[{key:"all",label:"Tudo"},{key:"today",label:"Hoje"},{key:"tomorrow",label:"Amanhã"},{key:"week",label:"7 dias"},{key:"custom",label:"Personalizado"}].map(f=>(
                  <button key={f.key} onClick={()=>setFinDateFilter(f.key)}
                    style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,border:`1px solid ${finDateFilter===f.key?C.accent:C.border}`,background:finDateFilter===f.key?C.accentSoft:"transparent",color:finDateFilter===f.key?C.accent:C.textMuted,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>
                    {f.label}
                  </button>
                ))}
                {finDateFilter==="custom"&&(
                  <div style={{display:"flex",alignItems:"center",gap:7,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"5px 10px"}}>
                    <input type="date" value={finCustomFrom} onChange={e=>setFinCustomFrom(e.target.value)} style={{background:"transparent",border:"none",color:C.text,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}/>
                    <span style={{color:C.textMuted,fontSize:12}}>→</span>
                    <input type="date" value={finCustomTo} onChange={e=>setFinCustomTo(e.target.value)} style={{background:"transparent",border:"none",color:C.text,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}/>
                    {(finCustomFrom||finCustomTo)&&<button onClick={()=>{setFinCustomFrom("");setFinCustomTo("");}} style={{background:"none",border:"none",color:C.red,cursor:"pointer",fontSize:13,padding:0}}>×</button>}
                  </div>
                )}
              </div>
 
              {/* Per-currency cards — always show all 3 */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18}}>
                {Object.entries(CURRENCIES).map(([key,cur])=>{
                  const filtE=entries.filter(e=>e.currency===key&&(filterCompany==="all"||e.companyId===filterCompany)&&entryMatchesDateFilter(e));
                  const inc=filtE.filter(e=>e.type==="income").reduce((s,e)=>s+Number(e.amount),0);
                  const exp=filtE.filter(e=>e.type==="expense").reduce((s,e)=>s+Number(e.amount),0);
                  const bal=inc-exp;
                  return(
                    <div key={key} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,padding:18}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                        <div style={{width:32,height:32,borderRadius:8,background:C.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:C.accent}}>{cur.symbol}</div>
                        <div>
                          <div style={{fontSize:14,fontWeight:700,color:C.text}}>{cur.name}</div>
                          <div style={{fontSize:10,color:C.textMuted}}>{filtE.length} lançamentos</div>
                        </div>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"8px 10px",background:`${C.green}0D`,borderRadius:8}}>
                        <span style={{fontSize:12,color:C.textMuted}}>↑ Entradas</span>
                        <span style={{fontSize:14,fontWeight:700,color:C.green}}>+{cur.symbol} {inc.toLocaleString()}</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"8px 10px",background:`${C.red}0D`,borderRadius:8}}>
                        <span style={{fontSize:12,color:C.textMuted}}>↓ Saídas</span>
                        <span style={{fontSize:14,fontWeight:700,color:C.red}}>-{cur.symbol} {exp.toLocaleString()}</span>
                      </div>
                      <div style={{height:1,background:C.border,marginBottom:8}}/>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:12,color:C.textMuted,fontWeight:600}}>Saldo</span>
                        <span style={{fontSize:16,fontWeight:700,color:bal>=0?C.green:C.red}}>{cur.symbol} {bal.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
 
              {/* Entries table */}
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                <div style={{padding:"11px 15px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:11,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:0.5}}>{t.entries}</span>
                  <button onClick={()=>setShowNewEntry(true)} style={{padding:"5px 12px",borderRadius:7,fontSize:12,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer",fontFamily:"inherit"}}>+ {t.newEntry}</button>
                </div>
                {visibleEntries.filter(e=>entryMatchesDateFilter(e)).sort((a,b)=>b.date.localeCompare(a.date)).map(e=>{
                  const co=getCompany(e.companyId);const cl=getClient(e.clientId);const ec=CURRENCIES[e.currency]||CUR;
                  if(editEntryId===e.id)return(<EditEntryRow key={e.id} entry={e} C={C} inp={inp} activeCompanies={activeCompanies} clients={clients} onSave={saveEntry} onCancel={()=>setEditEntryId(null)} CUR={CUR}/>);
                  return(
                    <div key={e.id} className="er" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 15px",borderBottom:`1px solid ${C.border}`,transition:"all 0.13s"}}>
                      <div style={{width:29,height:29,borderRadius:7,background:`${e.type==="income"?C.green:C.red}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:e.type==="income"?C.green:C.red,flexShrink:0}}>{e.type==="income"?"↑":"↓"}</div>
                      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:C.text,marginBottom:3}}>{e.notes||(e.type==="income"?t.income:t.expense)}</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{co&&<Chip label={co.icon+" "+co.name} color={co.color}/>}{cl&&<Chip label={cl.name} color={C.textMuted} bg={C.border}/>}<Chip label={ec.symbol+" "+ec.name} color={C.textMuted} bg={C.border}/></div></div>
                      <div style={{textAlign:"right",marginRight:6}}><div style={{fontSize:13,fontWeight:700,color:e.type==="income"?C.green:C.red}}>{e.type==="income"?"+":"-"} {ec.symbol} {Number(e.amount).toLocaleString()}</div><div style={{fontSize:11,color:C.textDim}}>{e.date.slice(5)}</div></div>
                      <button onClick={()=>setEditEntryId(e.id)} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:13,opacity:0.5}} onMouseEnter={e2=>e2.target.style.opacity="1"} onMouseLeave={e2=>e2.target.style.opacity="0.5"}>✎</button>
                    </div>
                  );
                })}
                {visibleEntries.filter(e=>entryMatchesDateFilter(e)).length===0&&<div style={{padding:32,textAlign:"center",color:C.textDim,fontSize:13}}>Nenhum lançamento.</div>}
              </div>
            </div>
          )}
 
          {/* NOTIFICATIONS */}
          {view==="notif"&&(
            <div className="fi">
              {notifTasks.length>0&&(
                <div style={{display:"flex",gap:9,marginBottom:16}}>
                  <button onClick={()=>setReadNotifs(r=>[...new Set([...r,...notifTasks.map(tk=>tk.id)])])} style={{padding:"8px 16px",borderRadius:9,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer",fontFamily:"inherit"}}>✓ {t.markAllRead}</button>
                  <button onClick={()=>{setTasks(tt=>tt.map(tk=>notifTasks.some(n=>n.id===tk.id)?{...tk,status:"done"}:tk));setReadNotifs(r=>[...new Set([...r,...notifTasks.map(tk=>tk.id)])]);}} style={{padding:"8px 16px",borderRadius:9,fontSize:13,fontWeight:600,background:`${C.green}18`,border:`1px solid ${C.green}44`,color:C.green,cursor:"pointer",fontFamily:"inherit"}}>✅ {t.markAllDone}</button>
                </div>
              )}
              {notifTasks.length===0&&<div style={{textAlign:"center",padding:48,color:C.textMuted,fontSize:14}}>✓ {t.noPending}</div>}
              {[{label:t.todayLabel,color:C.red,tasks:notifTasks.filter(tk=>tk.due===TODAY)},{label:t.tomorrowLabel,color:C.yellow,tasks:notifTasks.filter(tk=>tk.due===TOMORROW)}].map(group=>group.tasks.length>0&&(
                <div key={group.label} style={{marginBottom:18}}>
                  <h3 style={{fontSize:12,fontWeight:600,color:C.textMuted,marginBottom:9,textTransform:"uppercase",letterSpacing:0.5,display:"flex",alignItems:"center",gap:6}}><span style={{color:group.color}}>●</span>{group.label}</h3>
                  {group.tasks.map(tk=>{const co=getCompany(tk.companyId);const cl=getClient(tk.clientId);return(
                    <div key={tk.id} className="mc" style={{background:C.card,border:`1px solid ${group.color}44`,borderRadius:11,padding:13,marginBottom:7,cursor:"pointer",display:"flex",alignItems:"center",gap:11}} onClick={()=>{setViewTask(tk);setEditTask({...tk});setEditingTask(false);setView("tasks");}}>
                      <div style={{width:34,height:34,borderRadius:8,background:`${group.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{group.label===t.todayLabel?"🔴":"🟡"}</div>
                      <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:4}}>{tk.title}</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{co&&<Chip label={co.icon+" "+co.name} color={co.color}/>}{cl&&<Chip label={cl.name} color={C.textMuted} bg={C.border}/>}<Chip label={prioLabel(tk.priority)} color={prioColor(tk.priority)}/></div></div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                        <span style={{fontSize:12,color:group.color,fontWeight:700}}>{tk.due}</span>
                        <button onClick={e=>{e.stopPropagation();updateTask(tk.id,{status:"done"});setReadNotifs(r=>[...r,tk.id]);}} style={{padding:"4px 10px",borderRadius:7,background:`${C.green}18`,border:`1px solid ${C.green}44`,color:C.green,cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:600}}>✓ {t.done}</button>
                      </div>
                    </div>
                  );})}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
 
      {/* ══ MODALS ══ */}
 
      {/* Edit nav item */}
      {editNavItem&&(
        <Modal onClose={()=>{setEditNavItem(null);setShowIconPicker(false);setShowColorPickerNav(false);}} C={C} title={t.customizeNav}>
          <Field label={t.icon} C={C}><div style={{position:"relative",display:"inline-block"}}><button onClick={()=>{setShowIconPicker(!showIconPicker);setShowColorPickerNav(false);}} style={{width:46,height:46,borderRadius:9,background:C.surface,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center"}}>{editNavItem.icon}</button>{showIconPicker&&<IconPicker C={C} onSelect={ic=>setEditNavItem({...editNavItem,icon:ic})} onClose={()=>setShowIconPicker(false)}/>}</div></Field>
          <Field label={t.color} C={C}><div style={{position:"relative",display:"inline-block"}}><button onClick={()=>{setShowColorPickerNav(!showColorPickerNav);setShowIconPicker(false);}} style={{width:46,height:46,borderRadius:9,background:editNavItem.color,border:`2px solid ${C.border}`,cursor:"pointer"}}/>{showColorPickerNav&&<ColorPicker C={C} current={editNavItem.color} onSelect={col=>setEditNavItem({...editNavItem,color:col})} onClose={()=>setShowColorPickerNav(false)}/>}</div></Field>
          <Actions C={C} onCancel={()=>{setEditNavItem(null);setShowIconPicker(false);setShowColorPickerNav(false);}} onConfirm={()=>{setNavItems(items=>items.map(x=>x.id===editNavItem.id?editNavItem:x));setEditNavItem(null);}} lbl={t.saveNav}/>
        </Modal>
      )}
 
      {/* Task detail/edit */}
      {viewTask&&editTask&&(
        <Modal onClose={()=>{setViewTask(null);setEditingTask(false);}} C={C} title={editingTask?t.editTask:t.taskDetail} wide>
          {!editingTask?(
            <div>
              <div style={{background:C.surface,borderRadius:10,padding:13,marginBottom:12,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:9,lineHeight:1.5}}>{viewTask.title}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {getCompany(viewTask.companyId)&&<Chip label={getCompany(viewTask.companyId).icon+" "+getCompany(viewTask.companyId).name} color={getCompany(viewTask.companyId).color}/>}
                  {getClient(viewTask.clientId)&&<Chip label={getClient(viewTask.clientId).name} color={C.textMuted} bg={C.border}/>}
                  <Chip label={prioLabel(viewTask.priority)} color={prioColor(viewTask.priority)}/>
                  <Chip label={statusLabel(viewTask.status)} color={statusColor(viewTask.status)}/>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:14}}>
                {[{label:t.assignee,val:viewTask.assignee||"—"},{label:t.due,val:viewTask.due?new Date(viewTask.due).toLocaleDateString(lang==="pt"?"pt-BR":lang==="es"?"es-ES":"en-US"):"—"}].map((f,i)=>(<div key={i}><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:0.7,textTransform:"uppercase",marginBottom:4}}>{f.label}</div><div style={{fontSize:13,color:C.text,fontWeight:500}}>{f.val}</div></div>))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setEditingTask(true)} style={{flex:2,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.accent,border:"none",color:C.bg,cursor:"pointer"}}>✎ {t.editTask}</button>
                <button onClick={()=>{deleteTask(viewTask.id);setViewTask(null);}} style={{flex:1,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:`${C.red}18`,border:`1px solid ${C.red}44`,color:C.red,cursor:"pointer"}}>{t.deleteTask}</button>
                <button onClick={()=>setViewTask(null)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer"}}>{t.closeBtn}</button>
              </div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              <Field label={t.title} C={C}><input style={inp(C)} value={editTask.title} onChange={e=>setEditTask({...editTask,title:e.target.value})}/></Field>
              <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                <Field label={t.company} C={C} half><select style={inp(C)} value={editTask.companyId} onChange={e=>setEditTask({...editTask,companyId:e.target.value,clientId:""})}>{activeCompanies.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></Field>
                <Field label={t.client} C={C} half><select style={inp(C)} value={editTask.clientId} onChange={e=>setEditTask({...editTask,clientId:e.target.value})}><option value="">—</option>{clientsForCompany(editTask.companyId).map(cl=><option key={cl.id} value={cl.id}>{cl.name}</option>)}</select></Field>
                <Field label={t.priority} C={C} half><select style={inp(C)} value={editTask.priority} onChange={e=>setEditTask({...editTask,priority:e.target.value})}><option value="high">{t.high}</option><option value="medium">{t.medium}</option><option value="low">{t.low}</option></select></Field>
                <Field label={t.status} C={C} half><select style={inp(C)} value={editTask.status} onChange={e=>setEditTask({...editTask,status:e.target.value})}><option value="todo">{t.todo}</option><option value="doing">{t.doing}</option><option value="done">{t.done}</option></select></Field>
                <Field label={t.assignee} C={C} half><input style={inp(C)} value={editTask.assignee} onChange={e=>setEditTask({...editTask,assignee:e.target.value})}/></Field>
                <Field label={t.due} C={C} half><input type="date" style={inp(C)} value={editTask.due} onChange={e=>setEditTask({...editTask,due:e.target.value})}/></Field>
              </div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <button onClick={()=>setEditingTask(false)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer"}}>{t.cancel}</button>
                <button onClick={saveTask} style={{flex:2,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.accent,border:"none",color:C.bg,cursor:"pointer"}}>{t.saveChanges}</button>
              </div>
            </div>
          )}
        </Modal>
      )}
 
      {/* Nova Tarefa */}
      {showNewTask&&(
        <Modal onClose={()=>setShowNewTask(false)} C={C} title={"+ "+t.newTask}>
          <Field label={t.title} C={C}><input style={inp(C)} placeholder="..." value={newTask.title} onChange={e=>setNewTask({...newTask,title:e.target.value})}/></Field>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            <Field label={t.company} C={C} half><select style={inp(C)} value={newTask.companyId} onChange={e=>setNewTask({...newTask,companyId:e.target.value,clientId:""})}>{activeCompanies.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></Field>
            <Field label={t.client} C={C} half><select style={inp(C)} value={newTask.clientId} onChange={e=>setNewTask({...newTask,clientId:e.target.value})}><option value="">—</option>{clientsForCompany(newTask.companyId).map(cl=><option key={cl.id} value={cl.id}>{cl.name}</option>)}</select></Field>
            <Field label={t.priority} C={C} half><select style={inp(C)} value={newTask.priority} onChange={e=>setNewTask({...newTask,priority:e.target.value})}><option value="high">{t.high}</option><option value="medium">{t.medium}</option><option value="low">{t.low}</option></select></Field>
            <Field label={t.status} C={C} half><select style={inp(C)} value={newTask.status} onChange={e=>setNewTask({...newTask,status:e.target.value})}><option value="todo">{t.todo}</option><option value="doing">{t.doing}</option><option value="done">{t.done}</option></select></Field>
            <Field label={t.assignee} C={C} half><input style={inp(C)} value={newTask.assignee} onChange={e=>setNewTask({...newTask,assignee:e.target.value})}/></Field>
            <Field label={t.due} C={C} half><input type="date" style={inp(C)} value={newTask.due} onChange={e=>setNewTask({...newTask,due:e.target.value})}/></Field>
          </div>
          <Actions C={C} onCancel={()=>setShowNewTask(false)} onConfirm={addTask} lbl={t.create+" "+t.tasks.toLowerCase()}/>
        </Modal>
      )}
 
      {/* Nova Empresa */}
      {showNewCompany&&(
        <Modal onClose={()=>setShowNewCompany(false)} C={C} title={"+ "+t.newCompany}>
          <Field label={t.name} C={C}><input style={inp(C)} placeholder="Nome da empresa" value={newCompany.name} onChange={e=>setNewCompany({...newCompany,name:e.target.value})}/></Field>
          <Field label={t.icon} C={C}><div style={{position:"relative",display:"inline-block"}}><button onClick={()=>setShowCIconPicker(!showCIconPicker)} style={{width:46,height:46,borderRadius:9,background:C.surface,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center"}}>{newCompany.icon}</button>{showCIconPicker&&<IconPicker C={C} onSelect={ic=>{setNewCompany({...newCompany,icon:ic});setShowCIconPicker(false);}} onClose={()=>setShowCIconPicker(false)}/>}</div></Field>
          <Field label={t.color} C={C}><div style={{position:"relative",display:"inline-block"}}><button onClick={()=>setShowCColorPicker(!showCColorPicker)} style={{width:46,height:46,borderRadius:9,background:newCompany.color,border:`2px solid ${C.border}`,cursor:"pointer"}}/>{showCColorPicker&&<ColorPicker C={C} current={newCompany.color} onSelect={col=>{setNewCompany({...newCompany,color:col});setShowCColorPicker(false);}} onClose={()=>setShowCColorPicker(false)}/>}</div></Field>
          <Actions C={C} onCancel={()=>setShowNewCompany(false)} onConfirm={addCompany} lbl={t.create}/>
        </Modal>
      )}
 
      {/* Novo Tipo Projeto */}
      {showNewProjType&&(
        <Modal onClose={()=>setShowNewProjType(false)} C={C} title="+ Tipo de Projeto">
          <Field label={t.company} C={C}><select style={inp(C)} value={newProjTypeFor} onChange={e=>setNewProjTypeFor(e.target.value)}>{activeCompanies.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></Field>
          <Field label={t.name} C={C}><input style={inp(C)} placeholder="Ex: Site, Marca..." value={newProjTypeName} onChange={e=>setNewProjTypeName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addProjectType()}/></Field>
          <Actions C={C} onCancel={()=>setShowNewProjType(false)} onConfirm={addProjectType} lbl={t.create}/>
        </Modal>
      )}
 
      {/* Novo Cliente */}
      {showNewClient&&(
        <Modal onClose={()=>setShowNewClient(false)} C={C} title={"+ "+t.newClient} wide>
          <Field label={t.name} C={C}><input style={inp(C)} value={newClient.name} onChange={e=>setNewClient({...newClient,name:e.target.value})}/></Field>
          <Field label={t.companies2} C={C}><div style={{display:"flex",gap:8}}>{activeCompanies.map(c=>{const sel=newClient.companies.includes(c.id);return(<button key={c.id} onClick={()=>setNewClient({...newClient,companies:sel?newClient.companies.filter(x=>x!==c.id):[...newClient.companies,c.id]})} style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${sel?c.color:C.border}`,background:sel?`${c.color}18`:"transparent",color:sel?c.color:C.textMuted,cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:"inherit"}}>{c.icon} {c.name}</button>);})}</div></Field>
          <div style={{display:"flex",gap:10}}>
            <Field label={t.phone} C={C} half><input style={inp(C)} value={newClient.phone} onChange={e=>setNewClient({...newClient,phone:e.target.value})}/></Field>
            <Field label={t.email} C={C} half><input style={inp(C)} value={newClient.email} onChange={e=>setNewClient({...newClient,email:e.target.value})}/></Field>
          </div>
          <Field label={t.address} C={C}><input style={inp(C)} value={newClient.address} onChange={e=>setNewClient({...newClient,address:e.target.value})}/></Field>
          <Field label={t.projectTypes} C={C}>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {[...new Set(newClient.companies.flatMap(cid=>getCompany(cid)?.projectTypes||[]))].map(pt=>{const sel=newClient.projectTypes.includes(pt);return(<button key={pt} onClick={()=>setNewClient({...newClient,projectTypes:sel?newClient.projectTypes.filter(x=>x!==pt):[...newClient.projectTypes,pt]})} style={{padding:"4px 11px",borderRadius:20,border:`1px solid ${sel?C.accent:C.border}`,background:sel?C.accentSoft:"transparent",color:sel?C.accent:C.textMuted,cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600}}>{pt}</button>);})}
              <button onClick={()=>setShowNewProjType(true)} style={{padding:"4px 11px",borderRadius:20,border:`1px dashed ${C.accent}`,background:"transparent",color:C.accent,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>{t.newType}</button>
            </div>
          </Field>
          <Actions C={C} onCancel={()=>setShowNewClient(false)} onConfirm={addClient} lbl={t.create}/>
        </Modal>
      )}
 
      {/* View/Edit Client */}
      {viewClient&&(
        <Modal onClose={()=>{setViewClient(null);setEditClientId(null);}} C={C} title={editClientId?"✎ "+viewClient.name:viewClient.name} wide>
          {editClientId?(<EditClientForm client={clients.find(x=>x.id===editClientId)} C={C} inp={inp} activeCompanies={activeCompanies} onSave={saveClient} onCancel={()=>setEditClientId(null)} t={t}/>):(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:13}}>
                {[{label:t.phone,val:viewClient.phone||"—"},{label:t.email,val:viewClient.email||"—"},{label:t.address,val:viewClient.address||"—",full:true}].map((f,i)=>(<div key={i} style={{gridColumn:f.full?"1/-1":"auto"}}><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:0.7,textTransform:"uppercase",marginBottom:4}}>{f.label}</div><div style={{fontSize:13,color:C.text}}>{f.val}</div></div>))}
                <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:0.7,textTransform:"uppercase",marginBottom:6}}>{t.companies2}</div><div style={{display:"flex",gap:6}}>{viewClient.companies.map(cid=>{const co=getCompany(cid);return co?<Chip key={cid} label={co.icon+" "+co.name} color={co.color}/>:null;})}</div></div>
                <div style={{gridColumn:"1/-1"}}><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:0.7,textTransform:"uppercase",marginBottom:8}}>Tarefas</div>{tasks.filter(tk=>tk.clientId===viewClient.id).map(tk=>{const co=getCompany(tk.companyId);return(<div key={tk.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${C.border}`}}><div style={{width:6,height:6,borderRadius:2,background:co?.color,flexShrink:0}}/><span style={{fontSize:13,flex:1,color:tk.status==="done"?C.textMuted:C.text,textDecoration:tk.status==="done"?"line-through":"none"}}>{tk.title}</span><Chip label={statusLabel(tk.status)} color={statusColor(tk.status)}/></div>);})} {tasks.filter(tk=>tk.clientId===viewClient.id).length===0&&<div style={{fontSize:12,color:C.textDim}}>{t.noTask}</div>}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setEditClientId(viewClient.id)} style={{flex:2,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.accent,border:"none",color:C.bg,cursor:"pointer"}}>✎ {t.editClient}</button>
                <button onClick={()=>setViewClient(null)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer"}}>{t.closeBtn}</button>
              </div>
            </div>
          )}
        </Modal>
      )}
 
      {/* Novo Lançamento */}
      {showNewEntry&&(
        <Modal onClose={()=>setShowNewEntry(false)} C={C} title={"+ "+t.newEntry}>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            <Field label={t.entryType} C={C} half><select style={inp(C)} value={newEntry.type} onChange={e=>setNewEntry({...newEntry,type:e.target.value})}><option value="income">{t.income}</option><option value="expense">{t.expense}</option></select></Field>
            <Field label={t.entryAmount} C={C} half><input type="number" style={inp(C)} placeholder="0" value={newEntry.amount} onChange={e=>setNewEntry({...newEntry,amount:e.target.value})}/></Field>
            <Field label={t.noCurrencyForEntry} C={C}><div style={{display:"flex",gap:7}}>{Object.entries(CURRENCIES).map(([key,cur])=>(<button key={key} onClick={()=>setNewEntry({...newEntry,currency:key})} style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${newEntry.currency===key?C.accent:C.border}`,background:newEntry.currency===key?C.accentSoft:"transparent",color:newEntry.currency===key?C.accent:C.textMuted,cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:"inherit"}}>{cur.symbol} {cur.name}</button>))}</div></Field>
            <Field label={t.entryCompany} C={C} half><select style={inp(C)} value={newEntry.companyId} onChange={e=>setNewEntry({...newEntry,companyId:e.target.value,clientId:""})}>{activeCompanies.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></Field>
            <Field label={t.entryClient} C={C} half><select style={inp(C)} value={newEntry.clientId} onChange={e=>setNewEntry({...newEntry,clientId:e.target.value})}><option value="">—</option>{clientsForCompany(newEntry.companyId).map(cl=><option key={cl.id} value={cl.id}>{cl.name}</option>)}</select></Field>
            <Field label={t.entryDate} C={C} half><input type="date" style={inp(C)} value={newEntry.date} onChange={e=>setNewEntry({...newEntry,date:e.target.value})}/></Field>
            <Field label={t.entryNotes} C={C} half><input style={inp(C)} placeholder="..." value={newEntry.notes} onChange={e=>setNewEntry({...newEntry,notes:e.target.value})}/></Field>
          </div>
          <Actions C={C} onCancel={()=>setShowNewEntry(false)} onConfirm={addEntry} lbl={t.post}/>
        </Modal>
      )}
 
      {/* Edit Profile */}
      {showProfileEdit&&(
        <Modal onClose={()=>setShowProfileEdit(false)} C={C} title={t.editProfile}>
          <Field label={t.name} C={C}><input style={inp(C)} value={editProfile.name} onChange={e=>setEditProfile({...editProfile,name:e.target.value})}/></Field>
          <Field label={t.role} C={C}><input style={inp(C)} value={editProfile.role} onChange={e=>setEditProfile({...editProfile,role:e.target.value})}/></Field>
          <Field label="Foto da Galeria" C={C}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:C.border,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",fontSize:editProfile.photo?0:22,flexShrink:0}}>
                {editProfile.photo?<img src={editProfile.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:editProfile.emoji}
              </div>
              <div style={{display:"flex",gap:8,flexDirection:"column"}}>
                <button onClick={()=>photoInputRef.current?.click()} style={{padding:"7px 14px",borderRadius:8,background:C.accentSoft,border:`1px solid ${C.accent}44`,color:C.accent,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit"}}>📁 Upload da Galeria</button>
                {editProfile.photo&&<button onClick={()=>setEditProfile({...editProfile,photo:null})} style={{padding:"5px 10px",borderRadius:7,background:`${C.red}18`,border:`1px solid ${C.red}44`,color:C.red,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>✕ Remover foto</button>}
              </div>
              <input ref={photoInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>setEditProfile(p=>({...p,photo:ev.target.result,emoji:p.emoji}));r.readAsDataURL(f);}}}/>
            </div>
          </Field>
          <Field label={t.profilePhoto} C={C}><div style={{display:"flex",flexWrap:"wrap",gap:7}}>{["👤","😀","😎","🦁","🐯","🦊","🐺","🦋","🌟","💎","🚀","⚡","🎯","🔥","💡","🎨","🏆","🌈","✨","🦄","👑","🎭","🌺","🦅","🐉"].map(em=>(<button key={em} onClick={()=>setEditProfile({...editProfile,emoji:em,photo:null})} style={{width:36,height:36,borderRadius:8,background:editProfile.emoji===em&&!editProfile.photo?C.accentSoft:"transparent",border:`1px solid ${editProfile.emoji===em&&!editProfile.photo?C.accent:C.border}`,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>{em}</button>))}</div></Field>
          <Actions C={C} onCancel={()=>setShowProfileEdit(false)} onConfirm={()=>{setProfile({...editProfile});setShowProfileEdit(false);}} lbl={t.save}/>
        </Modal>
      )}
 
      {/* Edit Company (sidebar) */}
      {editSidebarCompany&&(
        <Modal onClose={()=>{setEditSidebarCompany(null);setShowSidebarIconPicker(false);setShowSidebarColorPicker(false);}} C={C} title="✎ Editar Empresa">
          <Field label="Nome" C={C}>
            <input style={inp(C)} value={editSidebarCompany.name} onChange={e=>setEditSidebarCompany({...editSidebarCompany,name:e.target.value})}/>
          </Field>
          <Field label="Ícone / Emoji" C={C}>
            <div style={{position:"relative",display:"inline-block"}}>
              <button onClick={()=>{setShowSidebarIconPicker(!showSidebarIconPicker);setShowSidebarColorPicker(false);}}
                style={{width:46,height:46,borderRadius:9,background:C.surface,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {editSidebarCompany.icon}
              </button>
              {showSidebarIconPicker&&<IconPicker C={C} onSelect={ic=>{setEditSidebarCompany({...editSidebarCompany,icon:ic});setShowSidebarIconPicker(false);}} onClose={()=>setShowSidebarIconPicker(false)}/>}
            </div>
          </Field>
          <Field label="Cor" C={C}>
            <div style={{position:"relative",display:"inline-block"}}>
              <button onClick={()=>{setShowSidebarColorPicker(!showSidebarColorPicker);setShowSidebarIconPicker(false);}}
                style={{width:46,height:46,borderRadius:9,background:editSidebarCompany.color,border:`2px solid ${C.border}`,cursor:"pointer"}}/>
              {showSidebarColorPicker&&<ColorPicker C={C} current={editSidebarCompany.color} onSelect={col=>{setEditSidebarCompany({...editSidebarCompany,color:col});setShowSidebarColorPicker(false);}} onClose={()=>setShowSidebarColorPicker(false)}/>}
            </div>
          </Field>
          <Actions C={C} onCancel={()=>{setEditSidebarCompany(null);setShowSidebarIconPicker(false);setShowSidebarColorPicker(false);}} onConfirm={saveSidebarCompany} lbl="Salvar"/>
        </Modal>
      )}
 
      {/* Settings */}
      {showSettings&&(
        <Modal onClose={()=>setShowSettings(false)} C={C} title={t.settings}>
          <Field label={t.language} C={C}><div style={{display:"flex",gap:8}}>{[["pt","🇧🇷 Português"],["en","🇺🇸 English"],["es","🇪🇸 Español"]].map(([l,label])=>(<button key={l} onClick={()=>setLang(l)} style={{flex:1,padding:"9px",borderRadius:9,border:`1px solid ${lang===l?C.accent:C.border}`,background:lang===l?C.accentSoft:"transparent",color:lang===l?C.accent:C.textMuted,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit"}}>{label}</button>))}</div></Field>
          <Field label={t.theme} C={C}><div style={{display:"flex",gap:8}}>{[["dark","🌙 "+t.dark],["light","☀️ "+t.light]].map(([th,label])=>(<button key={th} onClick={()=>setTheme(th)} style={{flex:1,padding:"9px",borderRadius:9,border:`1px solid ${theme===th?C.accent:C.border}`,background:theme===th?C.accentSoft:"transparent",color:theme===th?C.accent:C.textMuted,cursor:"pointer",fontWeight:600,fontSize:13,fontFamily:"inherit"}}>{label}</button>))}</div></Field>
          <Actions C={C} onCancel={()=>setShowSettings(false)} onConfirm={()=>setShowSettings(false)} lbl={t.save}/>
        </Modal>
      )}
    </div>
  );
}
 
function EditEntryRow({entry,C,inp,activeCompanies,clients,onSave,onCancel}){
  const [e,setE]=useState({...entry});
  const cls=clients.filter(cl=>cl.companies.includes(e.companyId));
  return(
    <div style={{display:"flex",alignItems:"center",gap:7,padding:"9px 15px",borderBottom:`1px solid ${C.border}`,background:C.accentSoft,flexWrap:"wrap"}}>
      <select value={e.type} onChange={x=>setE({...e,type:x.target.value})} style={{...inp(C),width:100,padding:"5px 8px"}}><option value="income">Entrada</option><option value="expense">Saída</option></select>
      <input type="number" value={e.amount} onChange={x=>setE({...e,amount:x.target.value})} style={{...inp(C),width:100,padding:"5px 8px"}}/>
      <select value={e.currency} onChange={x=>setE({...e,currency:x.target.value})} style={{...inp(C),width:90,padding:"5px 8px"}}>{Object.entries(CURRENCIES).map(([k,v])=><option key={k} value={k}>{v.symbol} {v.name}</option>)}</select>
      <select value={e.companyId} onChange={x=>setE({...e,companyId:x.target.value,clientId:""})} style={{...inp(C),width:130,padding:"5px 8px"}}>{activeCompanies.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select>
      <select value={e.clientId} onChange={x=>setE({...e,clientId:x.target.value})} style={{...inp(C),width:110,padding:"5px 8px"}}><option value="">—</option>{cls.map(cl=><option key={cl.id} value={cl.id}>{cl.name}</option>)}</select>
      <input type="date" value={e.date} onChange={x=>setE({...e,date:x.target.value})} style={{...inp(C),width:125,padding:"5px 8px"}}/>
      <input value={e.notes} onChange={x=>setE({...e,notes:x.target.value})} style={{...inp(C),flex:1,minWidth:90,padding:"5px 8px"}} placeholder="Observação"/>
      <button onClick={()=>onSave(e)} style={{padding:"5px 11px",borderRadius:7,background:C.accent,border:"none",color:C.bg,cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:"inherit"}}>✓</button>
      <button onClick={onCancel} style={{padding:"5px 9px",borderRadius:7,background:"none",border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>✕</button>
    </div>
  );
}
 
function EditClientForm({client,C,inp,activeCompanies,onSave,onCancel,t}){
  const [cl,setCl]=useState({...client});
  return(
    <div style={{display:"flex",flexDirection:"column",gap:11}}>
      <div><label style={{fontSize:10,color:C.textMuted,fontWeight:600,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:0.7}}>{t.name}</label><input style={inp(C)} value={cl.name} onChange={e=>setCl({...cl,name:e.target.value})}/></div>
      <div><label style={{fontSize:10,color:C.textMuted,fontWeight:600,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:0.7}}>{t.companies2}</label><div style={{display:"flex",gap:8}}>{activeCompanies.map(c=>{const sel=cl.companies.includes(c.id);return(<button key={c.id} onClick={()=>setCl({...cl,companies:sel?cl.companies.filter(x=>x!==c.id):[...cl.companies,c.id]})} style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${sel?c.color:C.border}`,background:sel?`${c.color}18`:"transparent",color:sel?c.color:C.textMuted,cursor:"pointer",fontWeight:600,fontSize:12,fontFamily:"inherit"}}>{c.icon} {c.name}</button>);})}</div></div>
      <div style={{display:"flex",gap:10}}>
        <div style={{flex:1}}><label style={{fontSize:10,color:C.textMuted,fontWeight:600,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:0.7}}>{t.phone}</label><input style={inp(C)} value={cl.phone} onChange={e=>setCl({...cl,phone:e.target.value})}/></div>
        <div style={{flex:1}}><label style={{fontSize:10,color:C.textMuted,fontWeight:600,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:0.7}}>{t.email}</label><input style={inp(C)} value={cl.email} onChange={e=>setCl({...cl,email:e.target.value})}/></div>
      </div>
      <div><label style={{fontSize:10,color:C.textMuted,fontWeight:600,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:0.7}}>{t.address}</label><input style={inp(C)} value={cl.address} onChange={e=>setCl({...cl,address:e.target.value})}/></div>
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <button onClick={onCancel} style={{flex:1,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted,cursor:"pointer"}}>{t.cancel}</button>
        <button onClick={()=>onSave(cl)} style={{flex:2,padding:"9px",borderRadius:9,fontSize:13,fontWeight:600,fontFamily:"inherit",background:C.accent,border:"none",color:C.bg,cursor:"pointer"}}>{t.saveClient}</button>
      </div>
    </div>
  );
}
