const id = document.querySelector("#id"),
name = document.querySelector("#name"),
pw = document.querySelector("#pw"),
confirmpw = document.querySelector("#confirm-pw"),
registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert("아이디를 입력해주세요.");
    if(pw.value !== confirmpw.value) return alert("비밀번호가 일치하지 않습니다.");

    const req = {
       id: id.value,
       name: name.value,
       pw: pw.value,
    };
    
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        //로그인 성공시 루트페이지 연결
        if(res.success) {
            location.href = '/login';
        }
        //로그인 실패시 실패 메시지 출력
        else {
            alert(res.msg);
        }
    })
    //로그인중 에러 발생시 에러 메시지 출력
    .catch((err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    });
};
