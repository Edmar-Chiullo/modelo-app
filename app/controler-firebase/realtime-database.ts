import { getDatabase, connectDatabaseEmulator,  set, ref, onValue, get, child } from "firebase/database";
import { app } from "./firebasekey/firebasekey";

import { EmployeeProps, ItemOrderProps, OrderProps, TaskProps } from "../interface/interfaces";
import { fullDate, fullHour } from "../utils/create-date";
import { Order } from "../class/classes";

// createde instance of db realtime-databse
const database = getDatabase(app);

// if (process.env.NODE_ENV === "development") {
//   connectDatabaseEmulator(database, "127.0.0.1", 9000); // Porta padrão para Realtime Database
// }

// Gravar dados em um lugar especifico usando o método set().
// O método set() (altera todos os dados abaixo na árvore como uma atualizção) 
// Usar set() substitui os dados no local especificado, incluindo quaisquer nós filhos.
export function createUser({ ...props }:EmployeeProps) {
    set(ref(database, 'users/' + props.employeeId), {
      employeeId: props.employeeId,
      employeeName: props.employeeName,
      employeePermitionType: props.employeePermitionType
    });
  }
// OnValue executa um ouvinte que retorna os valores apartetir da ramificassão no banco de dados.
// Uma vez executado o onValue fica observando e qualquer alteração executada apartir do ponto implantado "users/" retorna a atualização.
// Caso não exista dados onValue retorna false para o método 'exists()' e null quando você chamar 'val()'  
export async function getUserAll() {
  let users
  const date = ref(database, 'users/');
  onValue(date, (snapshot) => {
    users = snapshot.val();    
    return users 
  })
}

// Gravar dados em um lugar especifico usando o método set().
// O método set() (altera todos os dados abaixo na árvore como uma atualizção) 
// Agenda set() substitui os dados no local especificado, incluindo quaisquer nós filhos.
export function createAgenda({ ...props }:TaskProps, taskStatus: string) {
  set(ref(database, 'tasks/' + props.taskAgendaDate.replace('/', '').replace('/','') + '/' + props.taskAgendaHour.replace(':','')), {
    taskId: props.taskId,
    taskEmployeeId: props.taskEmployeeId,
    taskEmployeeName: props.taskEmployeeName,
    taskTitle: props.taskTitle,
    taskDescription: props.taskDescription,
    taskAgendaDate: props.taskAgendaDate,
    taskAgendaHour: props.taskAgendaHour,
    taskRegisterDate: props.taskRegisterDate,
    taskAgendaState: taskStatus
  })
}
// Gravar dados em um lugar especifico usando o método set().
// O método set() (altera todos os dados abaixo na árvore como uma atualizção) 
// Pedido set() substitui os dados no local especificado, incluindo quaisquer nós filhos.
export function pushOrder({ ...props }:OrderProps | null) {
  set(ref(database, `/orders/${fullDate().slice(4,8)}/${fullDate().slice(2,8)}/${fullDate().slice(0,2)}/${props.orderId}`), {
    order: props,
  })
}

export function pushOrderItens({ ...props }:ItemOrderProps | null, orderId:string | null) {
  set(ref(database, `/order-itens/${fullDate().slice(4,8)}/${fullDate().slice(2,8)}/${fullDate().slice(0,2)}/${orderId}`), {
    orderlist: props,
  })
}

export function pushAlterOrder({ ...props }:any | null) {
  set(ref(database, `orders/${props.orderDate.slice(4,8)}/${props.orderDate.slice(2,8)}/${props.orderDate.slice(0,2)}/${props.orderId}` ), {
    order: props,
  })
}

export async function getOrderItens(id:any, date:any) {
  const dbRef = ref(getDatabase(app))
  return await get(child(dbRef, 'itens-order/' + date + '/' + id )).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return "No data available"
    }
  }).catch((error) => {
    return error
  });
}
