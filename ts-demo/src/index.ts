type aPartial<T> = {
    [P in keyof T]?: T[P]
}
type  Person = {
    name: string
    age: number
}
type PersonPartial = aPartial<Person>

