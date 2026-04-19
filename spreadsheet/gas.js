function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("家計簿");

  const balance = sheet.getRange("D3").getDisplayValue();
  const expense = sheet.getRange("B3").getDisplayValue();

  const result = {
    balance: balance, 
    expense: expense
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const params = JSON.parse(e.postData.contents);
    const { sheetName, ...data } = params;
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;

    sheet.appendRow(Object.values(data));

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // デバッグ用にエラーをログに残す
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}