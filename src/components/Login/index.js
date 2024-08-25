import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {

    state = {username:"", password:"",errorMsg:""}

    onChangeUsername = event => {
        this.setState({username:event.target.value,errorMsg:""})
    }

    onChangePassword = event => {
        this.setState({password:event.target.value,errorMsg:""})
    }

    onSubmitSuccess = jwtToken => {
        const {history} = this.props
        Cookies.set("token",jwtToken,{expires:30})
        history.replace("/")
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const {username,password} = this.state
        const id = uuidv4()
        const url = "https://zuai-backend-jr67.onrender.com/login/";
        const options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,password,id})
        }

        try {
        const response = await fetch(url,options)
        console.log(response)
        const data = await response.json()
        if (response.ok === true){
            this.onSubmitSuccess(data.token)
        }
        } catch (error) {
            this.setState({errorMsg:"Please Enter valid username & password"})
        }
    }


    render() {
        const {username,password,errorMsg} = this.state
        return (
            <form className='form-container' onSubmit={this.onSubmitForm} >
                <h1 className='form-heading' >POST LOGIN PAGE</h1>
                <div>
                    <label  htmlFor='username' >USERNAME</label>
                    <input className='form-input' onChange={this.onChangeUsername} value={username} id="username" type="text" placeholder='Enter USERNAME' required />
                </div>
                <div>
                    <label htmlFor='password' >PASSWORD</label>
                    <input className='form-input' onChange={this.onChangePassword} value={password} id="password" type="password" placeholder='Enter PASSWORD' required />
                </div>
                <button className='form-button' type="submit" >LOGIN</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
        )
    }
}

export default Login
