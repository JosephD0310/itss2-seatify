const routes = {
    home: '/',
    room: '/room/:id',
    generateRoomDetail: (id: string ) => `/room/${id}`,
}

export default routes