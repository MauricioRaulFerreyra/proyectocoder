const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

describe('test api rest full', () => {
  describe('PRODUCTOS', () => {
    it('GET productos deberia retornar un status 404', async () => {
      let response = await request.get('/productos')
      expect(response.status).to.eql(404)
    })
    it('GET producto existente deberia retornar un status 404', async () => {
      let response = await request.get('/productos/61e0931bbcf2d104d8538205')
      expect(response.status).to.eql(404)
    })
    it('GET producto inexistente deberia retornar un status 404', async () => {
      let response = await request.get('/productos/61e0931bbcf2d104d8538206')
      expect(response.status).to.eql(404)
    })
    it('POST con producto nuevo deberia retornar un status 200', async () => {
      const newPto = {
        nombre: 'Nike Air Force 1 Low Supreme Black',
        descripcion: 'zapatillas',
        codigo: '5',
        thumbail:
          'https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/tox82zk2vpaxa0u4pkls.jpg',
        precio: '10000',
        stock: '10'
      }
      let response = await request.post('/productos/').send(newPto)
      expect(response.status).to.eql(200)
    })
    it('PUT modificando un producto inexistente deberia retornar un status 400', async () => {
      const modPto = {
        nombre: 'Nike Air Force 1 Low Supreme Black',
        descripcion: 'zapatillas',
        codigo: '54',
        thumbail:
          'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-128.png',
        precio: '11000',
        stock: '10'
      }
      let response = await request
        .put('/productos/61e0931bbcf2d104d8538206')
        .send(modPto)
      expect(response.status).to.eql(400)
    })
    /*         it('PUT modificando un producto existente deberia retornar un status 200', async()=>{
            const modPto = {
                nombre: "Nike",
                descripcion: "zapatilla",
                codigo: "5",
                thumbail: "https://stockx-360.imgix.net/Nike-LD-Waffle-Sacai-Black-Nylon/Images/Nike-LD-Waffle-Sacai-Black-Nylon/Lv2/img01.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1584757351",
                precio: "8000",
                stock: "10"
            };
            let response = await request.put('/productos/62080b190924333452e3f4ad').send(modPto)
            expect(response.status).to.eql(200)

        })
        it('DELETE a un producto existente deberia retornar un status 200', async()=>{
            let response = await request.delete('/productos/55080b190924666452e3f4ad')
            expect(response.status).to.eql(400)
        }) */
    it('DELETE a un producto inexistente deberia retornar un status 400', async () => {
      let response = await request.delete('/productos/55e0931ddcf2d104d5218255')
      expect(response.status).to.eql(400)
    })
  })
})
