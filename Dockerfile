# 어떤 이미지로부터 새로운 이미지를 생성할건가?
FROM node:16.16.0

# 워킹 디렉토리 설정
WORKDIR /usr/src/app

# Docker를 실행할때 패키지에 대한 정보를 이미지로 저장한다
COPY package*.json ./

# npm install 명령어로 디펜던시를 설치하기
RUN npm install 

# 현재 경로에 있는 모든 파일을 이미지로 저장하겠다.
COPY . .

# PORT 연결하기
EXPOSE 4000

# 컨테이너에서 실행될 명령어
CMD ["npm", "start"]