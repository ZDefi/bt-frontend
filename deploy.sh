#!/bin/bash
if [ $# -eq 0 ];then
    echo "Useage:$0 static"
    echo "Eg. "
    echo "$0 static"
    echo "Please input your local file path?  /User/zhangsan/work/foo"
    echo "Please input your local file name?   build.zip"
    echo "Please input domain name?  finance"
    echo "Please input project name?  farm"
    exit
fi

if [[ $1 = "--help" ]] || [[ $1 = "-h" ]];then
    echo "前端发布脚本使用说明"
    echo "参数主要包含：本地文件路径（localpath），程序名称（project），域名（domain），程序包名称（filename）"
echo "输入你想了解的参数："
read Value
case $Value in
"localpath")
echo "项目压缩包所在路径，如：/Desktop/Work/baby/farm"
;;
"project")
echo "程序名称，如：farm,swap,admin,info"
;;
"domain")
echo "发布到哪个域名，如:flyswap.net就输入net即可,测试环境输入test"
;;
"filename")
echo "程序压缩包名称，如：要发布到服务器的项目压缩包，一般为build.zip，"
;;
*)
echo "输入参数错误，请输入括号内的参数"
;;
esac
exit
fi


net=/work/www/flyswap
FILEPATH=/Users/zhangwenpei/chain/flyswap/flyswap-frontend
FILENAME=build.zip
#echo "Please input your local file path?"
#read FILEPATH
#echo "Please input your local file name?"
#read FILENAME
echo "Please input domain name?"
read DOMAIN
echo "Please input project name?"
read PROJECT

function deploy_io() {
declare -a arry
arry=([1]="7" [2]="2")
for i in ${!arry[@]};do
	backpath="/tmp/bakup/io_`echo $RANDOM`"
	scp ${FILEPATH}/${FILENAME} root@${arry[$i]}:/tmp
	ssh root@${arry[$i]} "mkdir -p $backpath && mv $io/$PROJECT/* $backpath"
	ssh root@${arry[$i]} "unzip /tmp/${FILENAME} -d $io/$PROJECT/"
done
}
function deploy_net() {
declare -a arry
arry=([1]="119.8.98.217" [2]="119.13.87.32")
for i in ${!arry[@]};do
        backpath="/tmp/bakup/finance_`echo $RANDOM`"
        scp ${FILEPATH}/${FILENAME} root@${arry[$i]}:/tmp
        ssh root@${arry[$i]} "mkdir -p $backpath && mv $net/$PROJECT/* $backpath"
        ssh root@${arry[$i]} "unzip /tmp/${FILENAME} -d $net/$PROJECT/"
done
}
function deploy_info() {
declare -a arry
arry=([1]="1")
for i in ${!arry[@]};do
        backpath="/tmp/bakup/info_`echo $RANDOM`"
        scp ${FILEPATH}/${FILENAME} root@${arry[$i]}:/tmp
        ssh root@${arry[$i]} "mkdir -p $backpath && mv $info/$PROJECT/* $backpath"
        ssh root@${arry[$i]} "unzip /tmp/${FILENAME} -d $info/$PROJECT/"
done
}
function deploy_capital() {
declare -a arry
arry=([1]="1" [2]="8")
for i in ${!arry[@]};do
        backpath="/tmp/bakup/capital_`echo $RANDOM`"
        scp ${FILEPATH}/${FILENAME} root@${arry[$i]}:/tmp
        ssh root@${arry[$i]} "mkdir -p $backpath && mv $capital/$PROJECT/* $backpath"
        ssh root@${arry[$i]} "unzip /tmp/${FILENAME} -d $capital/$PROJECT/"
done
}
function deploy_xyz() {
declare -a arry
arry=([1]="1" [2]="2")
for i in ${!arry[@]};do
        backpath="/tmp/bakup/xyz_`echo $RANDOM`"
        scp ${FILEPATH}/${FILENAME} root@${arry[$i]}:/tmp
        ssh root@${arry[$i]} "mkdir -p $backpath && mv $xyz/$PROJECT/* $backpath"
        ssh root@${arry[$i]} "unzip /tmp/${FILENAME} -d $xyz/$PROJECT/"
done
}
function deploy_test() {
declare -a arry
arry=([1]="9")
for i in ${!arry[@]};do
        backpath="/tmp/bakup/test_`echo $RANDOM`"
        scp ${FILEPATH}/${FILENAME} root@${arry[$i]}:/tmp
        ssh root@${arry[$i]} "mkdir -p $backpath && mv $test/$PROJECT/* $backpath"
        ssh root@${arry[$i]} "unzip /tmp/${FILENAME} -d $test/$PROJECT/"
done
}
if [ ${DOMAIN} = io ];then
	deploy_io
elif [ ${DOMAIN} = net ];then
        deploy_net
elif [ ${DOMAIN} = info ];then
        deploy_info
elif [ ${DOMAIN} = capital ];then
        deploy_capital
elif [ ${DOMAIN} = xyz ];then
        deploy_xyz
elif [ ${DOMAIN} = test ];then
        deploy_test
else 
	echo "Domain input Error"
	exit
fi
