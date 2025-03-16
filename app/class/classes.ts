import { ClientProps, EmployeeProps, OrderProps, ProductProps, TaskProps, ItemOrderProps } from "../interface/interfaces";
import { convertCurrencyToNumber } from "../utils/converter-stringnumber";
import { fullDate, fullHour } from "../utils/create-date";

export class Employee implements EmployeeProps {    
    employeeId: number | null
    employeeName: string | null
    employeePermitionType: string | null

    constructor (props: EmployeeProps ) {
        this.employeeId = props.employeeId
        this.employeeName = props.employeeName
    	this.employeePermitionType = props.employeePermitionType
    }
}

export class Product implements ProductProps {
    productId: number | null
	productCod: string | null
	productDescription: string | null
	productType: string | null
	productUnitValor: number | null
	productRepresented: string | null
    productStatus: string | null

    constructor (props: ProductProps) {
        this.productId = props.productId
        this.productCod = props.productCod
        this.productDescription = props.productDescription
        this.productType = props.productType
        this.productUnitValor = props.productUnitValor
        this.productRepresented = props.productRepresented
        this.productStatus = props.productStatus
    }
}

export class Order implements OrderProps {
    orderId: string | null
    orderEmployeeId: number | null
    orderEmployeeName: string | null
    orderCliCOD: number | null
    orderValue: number | null
    orderFantasia: string | null
    orderDate: string | null
    orderHour: string | null
    orderStatus: boolean | null

    constructor(
        employee: EmployeeProps, 
        client: ClientProps,
        status: boolean
    ) {
        this.orderId = `${client.fantasia?.slice(0,2)}${String(client.cliCOD)?.slice(0,2).toString().split('-', 2)}-${fullHour()}`
        this.orderEmployeeId = employee.employeeId
        this.orderEmployeeName = employee?.employeeName
        this.orderCliCOD = client.cliCOD
        this.orderValue = 0
        this.orderFantasia = client.fantasia
        this.orderDate = fullDate()
        this.orderHour = fullHour()
        this.orderStatus = status
    }

    updateStatus(newStatus: boolean): void {
        this.orderStatus = newStatus;
    }

    setValue(value: number): void {
        this.orderValue = value
    }
}

export class Task implements TaskProps {
    taskId: string | null
    taskEmployeeId: string
    taskEmployeeName: string
    taskTitle: string
    taskDescription: string
    taskAgendaDate: string
    taskAgendaHour: string
    taskRegisterDate: string
    taskAgendaState: boolean

    constructor(props: TaskProps) {
        this.taskId = props.taskId
        this.taskEmployeeId = props.taskEmployeeId
        this.taskEmployeeName = props.taskEmployeeName
        this.taskTitle = props.taskTitle
        this.taskDescription = props.taskDescription
        this.taskAgendaDate = props.taskAgendaDate
        this.taskAgendaHour = props.taskAgendaHour
        this.taskRegisterDate = props.taskRegisterDate
        this.taskAgendaState = props.taskAgendaState
    }
}
  
export class ItemOrder implements ItemOrderProps {
    productCod: string | null;
    productDescription: string | null;
    productUnitaryValue: string | null;
    productQuantity: string | null;
    productIPI: string | null;
    productST: string | null;
  
    constructor(props: ItemOrderProps) {
      this.productCod = props.productCod;
      this.productDescription = props.productDescription;
      this.productUnitaryValue = props.productUnitaryValue;
      this.productQuantity = props.productQuantity;
      this.productIPI = props.productIPI;
      this.productST = props.productST;
    }

    get productFullValue(): number | null {
      const unitaryValue = this.productUnitaryValue;
      const value:any = convertCurrencyToNumber(unitaryValue)
      const ipi = parseFloat(this.productIPI ?? "0")
      const st = parseFloat(this.productST ?? "0")

      const quantity = parseFloat(this.productQuantity ?? "0");
  
      return isNaN(value) || isNaN(quantity) ? null : ((ipi + st ) + value * quantity) ;
    }

    get productQuantityUnity(): number | null {
        const unitaryValue = this.productUnitaryValue;
        const value:any = convertCurrencyToNumber(unitaryValue)
        const impostos = Number(this.productST) + Number(this.productIPI) 
        const qt = Number(this.productQuantity)
        const result = (value + impostos) * qt

        return result
    }
}