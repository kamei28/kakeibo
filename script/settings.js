/* ローカルデータ取得 */
let ldata = localStorage.getItem(data_id);
ldata = JSON.parse(ldata || '{"gas_url": "", "gss_url": ""}');
const {gas_url, gss_url} = ldata;
document.getElementById("status").innerText = `状態：${gas_url? "登録済み": "未登録"}`;

/* GAS, GSSをローカルに保存 */
document.getElementById("save-data").addEventListener("click", () => {
    let gas = document.getElementById("i-gas_url").value || gas_url;
    let gss = document.getElementById("i-gss_url").value || gss_url;

    // 簡易入力チェック
    if (!gas_url && !gas) {
        alert("データ入力に不備があります。");
        return null;
    }
    
    // localStorageに保存
    localStorage.setItem(data_id, JSON.stringify({ gas_url: gas, gss_url: gss }));
    location.href = "./index.html";
});