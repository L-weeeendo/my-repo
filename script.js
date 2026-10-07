const n1 = document.querySelector(".n1")
const n2 = document.querySelector(".n2")
const n3 = document.querySelector(".n3")
const n4 = document.querySelector(".n4")
const pts = document.querySelector(".pts")
const tip = document.querySelector(".tip")
const add = document.querySelector(".add")
const out = document.querySelector(".out")
const chg = document.querySelector(".chg")
const bie = document.querySelector(".bie")
const delany = (l,n) => {
    return l.filter(i => {
        let r = true
        if (i === n && r) {
            r = false
            return false
        }
        return true
    })
}
let point = 0
let slt_a = ""
let slt_b = ""
let ms = ""
let list = []
let can_nxt = false
let jiefa = ""
let o_f = [1,2,3,4]
let ms_L = ['a','b','c','d']
mak_nums()
function randoms(a,b){return Math.floor(Math.random()*(b-a+1)+a)}
function show(){
    [n1,n2,n3,n4].forEach(e => {
        e.style = ""
    })
    n1.textContent = list[0]
    n2.textContent = list[1]
    n3.textContent = list[2]
    n4.textContent = list[3]
    tip.style = ""
    slt_a = ""
    slt_b = ""
    ms = ""
    if (can_nxt){
        pts.textContent = String(--point)
    }
    can_nxt = false
}
function mak_nums(){
    list = []
    for(let i=0;i<4;i++){
        list.push(randoms(1,13))
    }
    while (!find_end(list)){
        list = []
        for(let i=0;i<4;i++){
            list.push(randoms(1,13))
        }
    }
    can_nxt = false
    show()
}
function mak_mth(n){
    let ma = {
        1: "+",
        2: "-",
        3: "*",
        4: "/"
    }
    return ma[n]
}
function find_end(l){
    for (let i1 of l){
        let l2 = delany(l,i1)
        for (let i2 of l2){
            let l3 = delany(l2,i2)
            for (let m1 of o_f){
                for (let i3 of l3){
                    let l4 = delany(l3,i3)
                    for (let m2 of o_f){
                        for (let i4 of l4){
                            for (let m3 of o_f){
                                let a1 = mths(i1,i2,m1)
                                let a2 = mths(a1,i3,m2)
                                let a3 = mths(a2,i4,m3)
                                jiefa = `((${i1}${mak_mth(m1)}${i2})${mak_mth(m2)}${i3})${mak_mth(m3)}${i4}`
                                if (a3 === 24){
                                    console.log(jiefa)
                                    return true
                                }
                                a2 = mths(i3,a1,m2)
                                a3 = mths(a2,i4,m3)
                                jiefa = `(${i3}${mak_mth(m2)}(${i1}${mak_mth(m1)}${i2}))${mak_mth(m3)}${i4}`
                                if (a3 === 24){
                                    console.log(jiefa)
                                    return true
                                }
                                a2 = mths(a1,i3,m2)
                                a3 = mths(i4,a2,m3)
                                jiefa = `${i4}${mak_mth(m3)}((${i1}${mak_mth(m1)}${i2})${mak_mth(m2)}${i3})`
                                if (a3 === 24){
                                    console.log(jiefa)
                                    return true
                                }
                                a2 = mths(i3,a1,m2)
                                a3 = mths(i4,a2,m3)
                                jiefa = `${i4}${mak_mth(m3)}(${i3}${mak_mth(m2)}(${i1}${mak_mth(m1)}${i2}))`
                                if (a3 === 24){
                                    console.log(jiefa)
                                    return true
                                }
                                a2 = mths(i3,i4,m2)
                                a3 = mths(a1,a2,m3)
                                jiefa = `(${i1}${mak_mth(m1)}${i2})${mak_mth(m3)}(${i3}${mak_mth(m2)}${i4})`
                                if (a3 === 24){
                                    console.log(jiefa)
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}
function mths(w,x,m){
    if (m === 4 && x === 0){
        return false
    }
    if (m === 1){
        return w + x
    } else if (m === 2){
        return w - x
    } else if (m === 3){
        return w * x
    } else if (m === 4){
        return w / x
    }
}
function turn_ms(a) {
    let dic = {
        'a': add,
        'b': out,
        'c': chg,
        'd': bie
    }
    return dic[a]
}
function ms_f(a) {
    if (slt_a !== ""){
        ms = a
        for (let i of ms_L){
            if (i === ms){
                turn_ms(i).style.background = "#58d8f3"
            } else {
                turn_ms(i).style = ""
            }
        }
    }
}
function ms_clear() {
    ms = ""
    ms_L.forEach(i => {
        turn_ms(i).style = ""
    })
}
function turn(a){
    if (a === 'n1'){
        return n1
    } else if (a === 'n2'){
        return n2
    } else if (a === 'n3'){
        return n3
    } else if (a === 'n4'){
        return n4
    }
}
function slt_elt(a){
    if (turn(a).style.opacity==="0"){return}
    if (slt_a===""){
        slt_a = turn(a)
        slt_b = ""
        slt_a.style.background = "#78d3c2"
        ms = ""
    } else if (slt_a!==turn(a)){
        slt_b = turn(a)
        if (Number(slt_b.textContent)===0 && ms==="d"){
            tip.textContent = "0不能做除数哦"
            tip.style.display = "block"
            tip.style.color = "darkred"
            tip.style.opacity = "1"
            setTimeout(()=>{
                tip.style = ""
                slt_b = ""
            }, 1000)
            return;
        }
        let b = Number(slt_a.textContent)
        let c = Number(slt_b.textContent)
        let d = 0
        if (ms===""){
            slt_a.style.background = ""
            slt_a = ""
            return;
        } else if (ms==='a'){
            d = b + c
        } else if (ms==='b'){
            d = b - c
        } else if (ms==='c'){
            d = b * c
        } else if (ms==='d'){
            d = b / c
        }
        slt_b.textContent = String(d)
        slt_a.textContent = ""
        slt_a.style.opacity = "0"
        let list = [n1.textContent,
        n2.textContent,
        n3.textContent,
        n4.textContent]
        let f = 0
        let n = 0
        let y = 0
        for (let i of list){
            if (i === ""){
                f++
            } else if (i === "24"){
                y++
            } else {
                n++
            }
        } if (f === 3){
            slt_b.style.position = "absolute"
            slt_b.style.top = "50%"
            slt_b.style.left = "50%"
            slt_b.style.transform = "translate(-50%, -50%)"
            slt_b.style.margin = "0"
            tip.style.display = "block"
            if (y === 1){
                slt_b.style.background = "green"
                pts.textContent = String(++point)
                tip.textContent = "恭喜"
                can_nxt = true
            } else if (n === 1){
                slt_b.style.background = "red"
                tip.textContent = "要等于24哦"
                tip.style.color = "darkred"
            }
            tip.style.opacity = "1"
        }
        slt_b = ""
        slt_a = ""
        ms_clear()
    }
}
function show_jie(){
    tip.textContent = jiefa
    tip.style.color = "black"
    tip.style.display = "block"
    tip.style.opacity = "1"
    setTimeout(() => {
        tip.style = ""
    },5000)
}