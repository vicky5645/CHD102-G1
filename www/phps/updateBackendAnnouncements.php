
<?php  
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type:application/json;charset=utf-8");
    $json = file_get_contents("php://input");
    $datas = json_decode($json, true); 
    try {
        require_once('peterSqlConnect.php');
        $sql ="UPDATE announcement SET anno_no = :anno_no,anno_title = :anno_title,anno_type = :anno_type,anno_content = :anno_content,anno_date = :anno_date,anno_file = :anno_file WHERE anno_no = :anno_no";
        $products = $pdo->prepare( $sql ); 
        $products->bindValue(":anno_no", $datas["id"]);
        $products->bindValue(":anno_title", $datas["title"]);
        $products->bindValue(":anno_type", $datas["type"] ); 
        $products->bindValue(":anno_content", $datas["content"]);
        $products->bindValue(":anno_date",  $datas["date"]); 
        $products->bindValue(":anno_file",  $datas["image"]);
        $products->execute();
        // $prodRows = $products->fetchAll(PDO::FETCH_ASSOC);
        // echo json_encode($prodRows);
    } catch (Exception $e) {
        echo "錯誤行號 : ", $e->getLine(), "<br>";
        echo "錯誤原因 : ", $e->getMessage(), "<br>";
        echo json_encode($e->getMessage());
    }
?>