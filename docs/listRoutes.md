List Routes

- User
  get('/') render halaman login user
  post('/') post data login user

  get('/register') render halaman login user
  post('/register') post data register user

  use('/user') require userRouter
  get('/user')get data user dan render halaman homepage user
  get('/user/profil')get data user dan render halaman profil user
  get('/user/profil/edit')get data user dan render halaman edit profil user
  post('/user/profil/edit') post data update profil user

  get('/user/password') render halaman password user
  post('/user/password') post data password lama user
  post('/user/password/baru') post data password baru user

  get('/user/lapor') render halaman lapor user
  post('/user/lapor') post data lapor user

  get('/user/riwayat') render halaman riwayat user
  get('/user/riwayat/:idLap') render halaman detail riwayat dengan id_laporan user

  get('/user/logout') halaman logout user (menghapus session) dengan method get tapi bukan untuk render
