import ButtonAppBar from './BasicAppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Catalogue from './Catalogue'
import ChatBotDialog from './ChatBotDialog'
import Fab from '@mui/material/Fab'
import ChatIcon from '@mui/icons-material/Chat'
import React from 'react'

export default function App(props) {
  const keycloak = props.keycloak
  const cart = []
  const [chatOpen, setChatOpen] = React.useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ButtonAppBar keycloak={keycloak} cart={cart}/>
      <Container>
        <Catalogue cart={cart}/>
      </Container>
      <Fab color="primary" aria-label="chat" onClick={() => setChatOpen(true)}
        sx={{ position: 'fixed', bottom: 32, right: 32 }}>
        <ChatIcon />
      </Fab>
      <ChatBotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </Box>
  )
}
