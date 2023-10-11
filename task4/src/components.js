import './css/AdminStyles.css'
import './css/TableStyles.css'
import './css/LoginStyle.scss'
import { useSelector, useDispatch } from 'react-redux';
import {SelectedUsers, Messages} from './redux/reducers';
import  CurrentHost from './host'
import React from 'react'
import { json } from 'react-router-dom';
const currentHost = CurrentHost()

export function AdminPanel(){


    const All_User =  useSelector((states)=>states.SelectedUsers).Selected_IDs
    const SelecteOnes =  useSelector((states)=>states.SelectedUsers.Selected_IDs)
    const UpdatePath_All_IDs = SelectedUsers.actions.UpdateAll
    const All_Users =  useSelector((states)=>states.SelectedUsers.All_IDs)
    const success_message = useSelector((states)=>states.Alerts.Success_Message)
    const error_message = useSelector((states)=>states.Alerts.Error_message)
    const Reset_all_Box = SelectedUsers.actions.Reset_all_checkboxes
    const Error_message = Messages.actions.UpdateErrorMessage
    const Success_message = Messages.actions.UpdateSuccessMessage
    const message = error_message ? <ErrorMessage message={error_message}/> : null || success_message ? <SuccessMessage message={success_message}/> : null   
    const token = localStorage.getItem('AdminTokenXXX')
    const dispatch = useDispatch()
    const [name, update_name] = React.useState(null);


    async function getAllUsers(){

        const request = await fetch(currentHost+'GetUsers/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        if (request.status==200){
            const result = await request.json()
            update_name(MAin=>result.currentUser.name)
            dispatch(UpdatePath_All_IDs(result.users))
        }
    }

    function Logout(){
        localStorage.removeItem('AdminTokenXXX')
        window.location.pathname = '../login'
    }

    async function DeleteSelected(){
        if (SelecteOnes){
            const response = await fetch(currentHost+'DeleteUsers/', { 
                method:'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body:JSON.stringify(SelecteOnes)
            }
        )
            const parsed_Data = await response.json()
            if (response.status==200){
                const Updated_users    = parsed_Data.DeletedUsers
                const DeletedRemoved   = All_Users.filter((user) => !Updated_users.includes(user.id));
                dispatch(UpdatePath_All_IDs(DeletedRemoved))
                dispatch(Reset_all_Box())
                console.log(response.currentDeleted)
                if (response.currentDeleted){
                    
                    dispatch(Error_message('You have Been Deleted as Well !'))
                    setTimeout(() => {
                        window.location.pathname = '../login'
                    }, 999);

                }else{
                    
                }
                dispatch(Success_message('SuccessFully Updated!'))
            }
    }
    }

    React.useEffect(Main=>{
        getAllUsers()
    }, [error_message, success_message])

    return (
        <div>
            <div id="header">
                <div className="shell">

                    <div id="top">
                    <h1><a href="#">Task #4 Admin Panel</a></h1>
                    <div id="top-navigation"> Welcome <a href="#"><strong>{name ? name : 'Admin'} </strong></a><span>|</span> <a onClick={Logout}>Log out</a> </div>
                    </div>

                    <div id="navigation">
                    <ul>
                        

                    </ul>
                    </div>

                </div>
            </div>


            <div id="container">
            <div className="shell">

                <div className="small-nav"> <a href="#">Admin Dashboard</a></div>

                    {message ? message : null}
           

                <br />

                <div id="main">
        
                <div id="content">
                        <LockButton/>
                        
                        <UnlockButton/>

                        <button onClick={DeleteSelected} style={{'marginLeft':'20px'}} className='btn btn-danger'>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg> <small>Delete Selected</small>

                        </button>

                    <div className="box">
                    
                    <div className="box-head">
                        <h2 className="left">Users in the Database </h2>
                        <div className="right">
                        <label><small>search users</small></label>
                
                            <input style={{width:'180px'}} className='form-control' type="text"/>
                            <input className='btn btn-warning' type="submit" value="search"/>
                
                        </div>
                        
                    </div>

                    <div className="table">

                        {<UsersTable/>}

                    </div>

                    </div>


                </div>

            
                <div id="sidebar">
                
                    <div className="box">
                
                    <div className="box-head">
                        <h2>Management</h2>
                    </div>

                    <div className="box-content">
                        <button className='btn btn-primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg> add user
                        </button>

                        <br/>
                        <br/>
                       

                
                        <div className="sort">
                        <label>Sort by</label>
                        <select className="field">
                            <option value="">Title</option>
                        </select>
                        <select className="field">
                            <option value="">Last login</option>
                        </select>
                        <select className="field">
                            <option value="">Status</option>
                        </select>
                        </div>
            
                    </div>
                    </div>
                
                </div>

        
                </div>

            </div>
            </div>

    </div>

    )
}



function User_Object(UsersProperties){
    return (
        <tr className="odd">
            <td><input type="checkbox" className="checkbox" /></td>
            <td><h3><a href="#">{UsersProperties.username}.</a></h3></td>
            <td>{UsersProperties.LastLogin}</td>
            <td><a href="#">{UsersProperties.status}</a></td>
            <td><a href="#" className="ico del">{UsersProperties.user}</a><a href="#" className="ico edit">Edit</a></td>
        </tr>
    )
}


function SuccessMessage({message}){
    const dispatch = useDispatch()
    const Success_message = Messages.actions.UpdateSuccessMessage
    const remove_success_alert = ()=>{
        dispatch(Success_message('reset'))
        console.log('alert removed')
    }
    return (
        <div className="msg msg-ok">
            <p><strong>{message}</strong></p>
        <a onClick={remove_success_alert} className="close">close</a> </div>
    )
}

function ErrorMessage({message}){
    const dispatch = useDispatch()
    const Error_message = Messages.actions.UpdateErrorMessage
    const remove_error = ()=>{
        dispatch(Error_message(null))
        
    }
    return (
        <div className="msg msg-error">
            <p><strong>{message}</strong></p>
        <a onClick={remove_error} className="close">close</a> </div>
    )
}

function UnlockButton(){
    const users = useSelector((states)=>states.SelectedUsers.Selected_IDs)
    const All_Users =  useSelector((states)=>states.SelectedUsers.All_IDs)
    const UpdatePath_All_IDs = SelectedUsers.actions.UpdateAll
    const Reset_all_Box = SelectedUsers.actions.Reset_all_checkboxes
    const Error_message = Messages.actions.UpdateErrorMessage
    const Success_message = Messages.actions.UpdateSuccessMessage

    const dispatch = useDispatch()

    function TakeAction(){
        if (!users.length == 0){
            const token = localStorage.getItem('AdminTokenXXX')
            fetch(currentHost+'LockUsers/a/', {
                method: 'POST',

                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(users),
            }).then(Result=>Result.json().then(Response=>{
                console.log()
                if (Response){
                    
                    const Updated_users    = Response.updated_users 
                    const Updated_user_ids = Updated_users.map((backendUser) => backendUser.id);
                    const unchanged_users  = All_Users.filter((user) => !Updated_user_ids.includes(user.id));
                    const all_updated_data = [...unchanged_users, ...Updated_users]
                    dispatch(UpdatePath_All_IDs(all_updated_data))
                    dispatch(Reset_all_Box(true))
                    dispatch(Success_message('SuccessFully Activated!'))
                    
                }else{
                    dispatch(Error_message('Something Went Wrong'))
                }
            }))
            
        }else{
            // Error
        }
    }
    const style = {width:'60px', height:'40px', marginLeft:'3px'}
    return (
        <button onClick={TakeAction} style={style} className='btn btn-secondary'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-unlock-fill" viewBox="0 0 16 16">
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
            </svg>
        </button>
    )
}


function LockButton(){
    const users = useSelector((states)=>states.SelectedUsers.Selected_IDs)
    const All_Users =  useSelector((states)=>states.SelectedUsers.All_IDs)
    const UpdatePath_All_IDs = SelectedUsers.actions.UpdateAll
    const Reset_all_Box = SelectedUsers.actions.Reset_all_checkboxes
    const Error_message = Messages.actions.UpdateErrorMessage
    const Success_message = Messages.actions.UpdateSuccessMessage

    const dispatch = useDispatch()

    function TakeAction(){
        
        if (!users.length == 0){
            const token = localStorage.getItem('AdminTokenXXX')
            
            fetch(currentHost+'LockUsers/d/', {
                method: 'POST',

                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(users),

            }).then(Result=>Result.json().then(Response=>{
                if (Response){
                    
                    const Updated_users    = Response.updated_users 
                    const Updated_user_ids = Updated_users.map((backendUser) => backendUser.id);
                    const unchanged_users  = All_Users.filter((user) => !Updated_user_ids.includes(user.id));
                    const all_updated_data = [...unchanged_users, ...Updated_users]
                    dispatch(UpdatePath_All_IDs(all_updated_data))
                    dispatch(Reset_all_Box(true))
                    
                    
                    if(Response.current_blocked){
                        dispatch(Error_message('You have Been Blocked !'))
                        setTimeout(() => {
                            window.location.pathname = '../login'
                        }, 999);
                    }else{
                        dispatch(Success_message('SuccessFully Blocked!'))
                    }

                }
            }))
    
        }else{
            dispatch(Error_message('You have Been Blocked !'))
            setTimeout(() => {
                window.location.pathname = '../login'
            }, 999);
        }
    }
    
    const style = {width:'60px', height:'40px'}
    return (
        <button onClick={TakeAction} style={style} className='btn btn-danger'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
        </button>
    )
}

function UsersTable(){
    const users = useSelector((states)=>states.SelectedUsers)
    const All_Selected = useSelector((states)=>states.SelectedUsers.all_selected)
    const ID_list = users.All_IDs
    const selected_IDs = users.Selected_IDs
    const dispatch = useDispatch()
    const UpdatePath_Selected_IDs = SelectedUsers.actions.UpdateSelected
    const all_selected_path = SelectedUsers.actions.Update_All_selected
    const processedUsers = ID_list.map(User=><UserTableLine user_id={User.id} key={User.id} name={User.Name} email={User.email} status={User.status} last_login={User.last_login}/>)
    const raw_IDs = ID_list.map(Each=>Each.id)
    
    function select_all(){
        if (!All_Selected){
            dispatch(UpdatePath_Selected_IDs([...raw_IDs]))
        }else{
            dispatch(UpdatePath_Selected_IDs([]))
        }
        dispatch(all_selected_path(!All_Selected))
    }

    function UserTableLine({user_id, name, email, last_login, status}){

        const Checked = selected_IDs.includes(user_id);
        
        function removeDigitFromArray(array, digitToRemove) {
            return array.filter((element) => element !== digitToRemove);
        }   

        function HandleChange(){
            let updated_list;
            if (Checked){
                updated_list = removeDigitFromArray(selected_IDs, user_id)
            }else{
                updated_list = [...selected_IDs, user_id]
            }
            dispatch(UpdatePath_Selected_IDs(updated_list))
        }

        return (
            <tr>
                <td>
                <input checked={Checked} onChange={HandleChange} type="checkbox" />
                </td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{last_login[0]} {last_login[1]}</td>
                <td>{status}</td>
            </tr>
        )
    }

    return (

        <table>
            <thead>
            <tr>
                <th>
                <small style={{ marginLeft: '-1px', marginBottom: '5px' }}>All</small>
                <br />
                <input checked={All_Selected} onChange={select_all} type="checkbox" id="selectAll" />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
                {processedUsers}
            </tbody>
      </table>

    )
}

export function LoginPage(){
    const [error, update_error] = React.useState(null)
    const emailField = React.useRef(null)
    const passwordField = React.useRef(null)
    async function Authentication(ButtonProps){
        ButtonProps.preventDefault()
        const email = emailField.current.value
        const password = passwordField.current.value
        if (email && password){

            const host = CurrentHost()
            const request = await fetch(host+'auth/', {
                method: 'POST',
                body:JSON.stringify({email:email, password:password})
            })
            const response = await request.json()

            if (request.status == 200){

                localStorage.setItem('AdminTokenXXX', response.token)
                window.location.pathname = './admin'
            
            }

            if (request.status == 401){
                update_error(Main=><ErrorMessage message={'this account does not exist or either blocked!'}/>)
            }

        }
    }

    return (
        <div id='loginBase'>
            <br/>
            {error ? error : null}
            <div className="container">
                
                <div className="screen">
                    
                    <div className="screen__content">
                        
                    
                        <form className="login">
                            
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                
                                <input ref={emailField} type="text" className="login__input" placeholder="Your Email"/>
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input ref={passwordField} type="password" className="login__input" placeholder="Password"/>
                            </div>
                            <button onClick={Authentication} className="button login__submit">
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>				
                        </form>
                        <div className="social-login">
                            <h3>Task 4 Admin Authentication</h3>
                        </div>
                        
                    </div>
                    
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>		
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>		
                </div>
            </div>
        </div>
    )
}