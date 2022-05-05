import {emailNotificationservice} from '../src/email-notification-service'
import {RegisterUserOnMailingList, RegisterUserOnMailingList} from '../src/register-user-on-mailing-list'
import {UserRepository} from '../src/user-repository'


describe('RegisterUserOnMailling Class', function () {
    let userRepository: UserRepository
    let emailNoticationService: EmailNotificationonService
    let sut: RegisterUserOnMailingList

    beforeEach( function (){
       userRepository = new userRepository()
       emailNoticationService = new emailNoticationService ()
       sut = new RegisterUserOnMailingList(
           userRepository,
           emailNoticationService
       )
    })

    test('Deverá trazer um erro se o usuário não puder ser adicionado na base dados',()=> {
        const spy = jest.spyOn(emailNoticationService,'send')
        spy.mockReturnValueOnce(false)
        expect(()=> {
            RegisterUserOnMailingList.execute({
                email:'abc',
                name: 'nome'
            })
        }).tothrow('Email notification not send')
        
    })
    test('Vai retornar um erro se o usuário já existir',()=>{
        const spy = jest.spyOn(userRepository,'findBy')
        spy.mockReturnValueOnce({
            name:'nome',
            email:'abc@'
        })
        expect(()=>{
            RegisterUserOnMailingList.execute({
                name:'nome',
                email:'abc@'
            })
        }).tothrow('User not registered')
    })
    test('vai retornar um erro caso a notificação não for enviada',()=>{
        jest.spyOn(emailNotificationservice,'send').mockReturnValueOnce(false)
        expect(() =>{
            RegisterUserOnMailingList.execute({
                name:'nome',
                email:'abc@'
            })
        }).tothrow('Email notification not sent')
    })
    Test ('Deve passar por todas as etapas',()=>{
        expect(()=>{
            RegisterUserOnMailingList.execute({
                email:'abc@'
                name:'nome'
            })
        }).not.tothrow()
    })


})




