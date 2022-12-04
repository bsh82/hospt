const id = document.querySelector("#id"),
pw = document.querySelector("#pw"),
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {

    const req = {
       id: id.value,
       pw: pw.value,
    };

    fetch("/login", {
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
            location.href = "/main?id="+res.userid+"&pw="+res.userpw;
        }
        //로그인 실패시 실패 메시지 출력
        else {
            alert("존재하지 않는 계정입니다.");
        }
    })
    //로그인중 에러 발생시 에러 메시지 출력
    .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
    });
};

