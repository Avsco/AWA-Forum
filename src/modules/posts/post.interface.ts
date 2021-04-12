export interface post {
  id?: string;
  title: string;
  content: string;
  category: string;
}

//TODO: esto no es asi :'v
export interface comment {
  idAutor: string;
  username: string;
  autorImage: string;
  content: string;
}
