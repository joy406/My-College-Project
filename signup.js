let name=document.getElementById('namefield');
let signupBtn=document.getElementById('signup');
let loginBtn=document.getElementById('login');

loginBtn.addEventListener("click",()=>{
    name.style.display="none";
    title.innerHTML="Login"
    signupBtn.classList.add('disable');
    loginBtn.classList.remove('disable');
})

signupBtn.addEventListener("click",()=>{
    name.style.display="block";
    title.innerHTML="Sign Up"
    signupBtn.classList.remove('disable');
    loginBtn.classList.add('disable');
})

async function login(){
    let email=document.getElementById('emailfield').value
    let password=document.getElementById('passwordfield').value

    let loginBtn=document.getElementById('login')
    loginBtn.innerHTML="Processing..."
    loginBtn.disabled=true
    
    console.log(email,password)
    let response=await fetch('https://cafe-backend-umber.vercel.app/api/user/login',{
    // let response=await fetch('http://localhost:5000/api/user/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    response=await response.json()

    loginBtn.innerHTML="login"
    loginBtn.disabled=false

    if(response._id && response.token){
        window.location.href="index.html";
    }
    if(response.msg==="email or password is missing"){
        alert("email or password is missing")
        return
    }
    if(response.msg==="Invalid Id or Password"){
        alert("Invalid Id or Password")
        return
    }
}
async function signup(){
    let name=document.getElementById('namefield').value
    let email=document.getElementById('emailfield').value
    let password=document.getElementById('passwordfield').value

    let signupBtn=document.getElementById('signup')
    signupBtn.innerHTML="Processing..."
    signupBtn.disabled=true

    let response=await fetch('https://cafe-backend-umber.vercel.app/api/user',{
        // let response=await fetch('http://localhost:5000/api/user/',{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    response=await response.json()

    signupBtn.innerHTML="signup"
    signupBtn.disabled=false

    if(response.msg==="User Added Successfully"){
        alert("User Added")
        document.getElementById('namefield').value=""
        document.getElementById('emailfield').value=""
        document.getElementById('passwordfield').value=""
        return
    }
    if(response.msg==="Please fill all the fields first"){
        alert("Please fill all the fields first")
        return
    }
    if(response.msg==="Email Already Exist"){
        alert("Email Already Exist")
        return
    }
}
