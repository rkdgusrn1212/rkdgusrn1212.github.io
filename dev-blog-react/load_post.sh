#!/bin/bash

rm -r src/posts
mkdir src/posts
mkdir src/posts/data
cd ../_posts
for file in *
do
    rsync ${file} ../dev-blog-react/src/posts/data/${file:0:${#file}-3}
    sed -i "" '1s/^/avoidjekyllparse/' ../dev-blog-react/src/posts/data/${file:0:${#file}-3}
done
cd ../dev-blog-react/src/posts/data
list=
cnt=0

write_md_info(){
    if [ ! -e "${1}" ]
    then
        return
    fi
    echo "import post${cnt} from 'posts/data/${1}';" >> ../index.js
    list+="post${cnt},"
    cnt=$(($cnt+1))
}

for i in *
do
    write_md_info "${i}"
done

echo "const fileList = [${list:0:${#list}-1}];" >> ../index.js
echo "export default fileList;" >> ../index.js