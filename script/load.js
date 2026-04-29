/* ローカルデータ取得 */
let ldata = localStorage.getItem(data_id);
ldata = JSON.parse(ldata || '{"gas_url": "", "gss_url": ""}');
if (!ldata.gas_url) {
    location.href = "./settings.html";
}
const {gas_url, gss_url} = ldata;

// GAS経由で所持金額と消費額を取得する関数
const getData = async () => {  
    try {
        const response = await fetch(gas_url);
        const data = await response.json();
        console.log(`現在の所持金額: ${data.balance?? "----"}円`);
        console.log(`今月の消費金額: ${data.expense?? "----"}円`);
        return data;
    } catch (error) {
        console.error("データの取得に失敗しました:", error);
        return {
            balance: "----",
            expense: "----"
        };
    }
}

// 数値を%02に変換する関数
const fill0 = d => (`0${d}`).slice(-2);

// 日付を初期入力する関数
const getToday = async () => {
    let date = new Date();
    return `${date.getFullYear()}-${fill0(date.getMonth() + 1)}-${fill0(date.getDate())}`
}

// ページのロードを完了させる実行関数
const reload = async () => {
    let loadpage = document.querySelector(".loading-now");
    let maincont = document.querySelector(".main-content");
    let today = await getToday();
    let data = await getData();

    // データ入力
    document.querySelector("#used-money").innerText = data.expense;
    document.querySelector("#now-money").innerText = data.balance;
    document.querySelector("#today-acc").value = today;
    document.querySelector("#today-amount").value = today;

    if (Number(data.balance.replaceAll(",", "")) <= 5000) {
        document.querySelector("#notice").innerText = "推奨：5,000円を引き出してください。";
    }

    // 初期化
    document.querySelector("#shop-name").value = "";
    document.querySelector("#thing-category").value = "食品類";
    document.querySelector("#amount").value = "";
    document.querySelector("#add-amount").value = "";

    //　ロード画面切替
    loadpage.classList.add("hidden");
    maincont.classList.remove("hidden");
};

reload();