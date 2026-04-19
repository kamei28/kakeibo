const data_id = "ACC_BOOK";
console.log("エラーが発生した際は`reset()`を実行");
const reset = () => {
    localStorage.removeItem(data_id);
    location.reload();
};

/* データ送信関数 */
async function sendData(payload) {
    //　ロード画面切替
    document.querySelector(".main-content").classList.add("hidden");
    document.querySelector(".loading-now").classList.remove("hidden");
    try {
        await fetch(gas_url, {
            method: "POST",
            mode: "no-cors", 
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        alert("家計簿にコミットしました！");
        reload();
    } catch (error) {
        alert("コミットに失敗しました。\nデータを確認して再度試してください。");
        console.error("送信エラー:", error);
    }
}

/* 会計登録のボタン処理・データ取得関数 */
document.querySelector("#acc-submit").addEventListener("click", async () => {
    let date = document.querySelector("#today-acc").value;
    let place = document.querySelector("#shop-name").value;
    let category = document.querySelector("#thing-category").value;
    let amount = document.querySelector("#amount").value;

    if (!date || !place || !category || !amount) {
        alert("データ入力に不備があります。");
        return null;
    }
    sendData({ sheetName: "消費履歴", date: date, place: place, category: category, amount: amount });
});

/* 入金登録のボタン処理・データ取得関数 */
document.querySelector("#money-submit").addEventListener("click", async () => {
    let date = document.querySelector("#today-amount").value;
    let amount = document.querySelector("#add-amount").value;

    if (!date || !amount) {
        alert("データ入力に不備があります。");
        return null;
    }
    sendData({ sheetName: "入金履歴", date: date, amount: amount });
});

/* リンク設定 */
// 家計簿アプリ
document.getElementById("main-app").addEventListener("click", () =>
    location.href = "./index.html"
);
// 家計簿設定
document.getElementById("settings").addEventListener("click", () =>
    location.href = "./settings.html"
);
// 集計データ
document.getElementById("data-link").addEventListener("click", () =>
    open(gss_url || "./settings.html")
);
// 技術リンク
document.getElementById("tech-link").addEventListener("click", () =>
    open("https://pastebin.com/1R7P9XzU")
);