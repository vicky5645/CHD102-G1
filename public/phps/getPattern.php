<?php
header('Access-Control-Allow-Origin: *');

try {
    //引入連線工作的檔案
    require_once("connect_chd102g1.php");
    // SQL 查詢
    $stmt = $pdo->query("SELECT * FROM pattern");
    $data = $stmt->fetchAll();

} catch (PDOException $e) {
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "錯誤原因 : ", $e->getMessage(), "<br>";
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}


// 輸出 JSON
echo json_encode($data);
?>