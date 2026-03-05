\## Student

\- Name: Юрчик Владислав Сергійович

\- Group: 232/2он



\## Practical Work: Development Environment Setup



\### Command Outputs



PS C:\\Users\\Frezz\\Documents\\hlpf-env-setup> docker --version

Docker version 29.2.1, build a5c7197

PS C:\\Users\\Frezz\\Documents\\hlpf-env-setup> docker compose version

Docker Compose version v5.0.2

PS C:\\Users\\Frezz\\Documents\\hlpf-env-setup> docker run --rm hello-world

Unable to find image 'hello-world:latest' locally

latest: Pulling from library/hello-world

17eec7bbc9d7: Pull complete

ea52d2000f90: Download complete

Digest: sha256:ef54e839ef541993b4e87f25e752f7cf4238fa55f017957c2eb44077083d7a6a

Status: Downloaded newer image for hello-world:latest



Hello from Docker!

This message shows that your installation appears to be working correctly.



To generate this message, Docker took the following steps:

&nbsp;1. The Docker client contacted the Docker daemon.

&nbsp;2. The Docker daemon pulled the "hello-world" image from the Docker Hub.

&nbsp;   (amd64)

&nbsp;3. The Docker daemon created a new container from that image which runs the

&nbsp;   executable that produces the output you are currently reading.

&nbsp;4. The Docker daemon streamed that output to the Docker client, which sent it

&nbsp;   to your terminal.



To try something more ambitious, you can run an Ubuntu container with:

&nbsp;$ docker run -it ubuntu bash



Share images, automate workflows, and more with a free Docker ID:

&nbsp;https://hub.docker.com/



For more examples and ideas, visit:

&nbsp;https://docs.docker.com/get-started/

PS C:\\Users\\Frezz\\Documents\\hlpf-env-setup> docker compose run --rm npm npm -v

Container hlpf-env-setup-npm-run-ea2415759a4f Creating

Container hlpf-env-setup-npm-run-ea2415759a4f Created tch   d Detach

11.11.0

PS C:\\Users\\Frezz\\Documents\\hlpf-env-setup> docker compose run --rm npm node --version

Container hlpf-env-setup-npm-run-7ad16fa47d63 Creating

Container hlpf-env-setup-npm-run-7ad16fa47d63 Created

v25.8.0



\### Repository structure

\- Dockerfile

\- docker-compose.yml

\- README.md

