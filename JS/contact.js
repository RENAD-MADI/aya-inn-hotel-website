// ================= EMAILJS =================

// CONFIG

const PUBLIC_KEY =
"BxlJ-0btBevWaks-D";

const SERVICE_ID =
"service_jhp1crf";

const TEMPLATE_ID =
"template_lszuykh";

// INIT

emailjs.init({

publicKey:
PUBLIC_KEY

});

// FORM

const form =

document.getElementById(
"contactForm"
);

// SUBMIT

if(form){

form.addEventListener(

"submit",

async function(e){

e.preventDefault();

// BUTTON

const btn =
form.querySelector(
"button"
);

const oldText =
btn.innerHTML;

btn.innerHTML =
"جاري الإرسال...";

btn.disabled =
true;

try{

const response =

await emailjs.send(

SERVICE_ID,

TEMPLATE_ID,

{

name:
form.name.value,

email:
form.email.value,

phone:
form.phone.value,

subject:
form.subject.value
|| "رسالة جديدة",

message:
form.message.value,

time:

new Date()

.toLocaleString(
"ar-SA"
)

}

);

console.log(
"SUCCESS",
response
);

alert(
"تم إرسال الرسالة بنجاح ✅"
);

form.reset();

}

catch(error){

console.log(
"ERROR",
error
);

alert(

error.text ||

error.message ||

"فشل الإرسال"

);

}

finally{

btn.innerHTML =
oldText;

btn.disabled =
false;

}

}

);

}