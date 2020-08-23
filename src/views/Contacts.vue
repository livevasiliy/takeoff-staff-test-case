<template>
  <v-app id="inspire">
    <Navbar/>
    <v-main>
      <Notification/>
      <Loader v-if="contacts.length < 0"/>
      <v-simple-table fixed-header v-else>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('firstName') }}</th>
            <th class="text-left">{{ $t('email') }}</th>
            <th class="text-left">{{ $t('phone') }}</th>
            <th class="text-left">{{ $t('position') }}</th>
            <th class="text-left">{{ $t('company') }}</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr
                  v-for="item in filterableContacts"
                  :key="item.id"
          >
            <td>
              <v-avatar :color="colors[Math.floor(Math.random() * colors.length)]" size="36" class="mr-2">
                <span class="white--text">
                  {{ `${item.firstName.substring(0, 1).toUpperCase()} ${item.lastName.substring(0, 1).toUpperCase()}` }}
                </span>
              </v-avatar>
              {{ `${item.firstName} ${item.lastName}` }}
            </td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.company }}</td>
            <td>
              <v-btn icon @click="editContact(item.id)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteContact(item.id)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-main>

    <AddContactButton @toggle-add-mode="toggleAddMode($event)"/>

    <CreateContact :create="addMode" @toggle-add-mode="toggleAddMode($event)"/>

    <EditContact
            :edit="editMode"
            :contact="contact"
            @toggle-edit-mode="toggleEditMode($event)"
    />

    <DeleteContact
            :deleteMode="deleteMode"
            :contact="contact"
            @toggle-delete-mode="toggleDeleteMode($event)"
    />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CreateContact from '@/components/Contacts/CreateContact'
  import EditContact from '@/components/Contacts/EditContact'
  import DeleteContact from '@/components/Contacts/DeleteContact'
  import AddContactButton from '@/components/Contacts/AddContactButton'
  import Notification from '@/components/Shared/Notification'
  import Loader from '@/components/Shared/Loader'
  import Navbar from '@/components/Shared/Navbar'

  export default {
    name: 'Contacts',
    components: { AddContactButton, Navbar, DeleteContact, Loader, EditContact, CreateContact, Notification },
    mounted () {
      this.$store.dispatch('fetchContacts')
    },
    data: () => ({
      contact: null,
      addMode: false,
      editMode: false,
      deleteMode: false,
      colors: [
        'red',
        'teal',
        'primary',
        'yellow',
      ],
    }),
    computed: {
      ...mapGetters(['contacts', 'message', 'search']),
      filterableContacts () {
        return this.contacts.filter(c => {
          return (c.firstName.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
            (c.lastName.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
            (c.phone.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
            (c.email.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
            (c.position.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
            (c.company.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        })
      },
    },
    methods: {
      editContact (id) {
        this.editMode = !this.editMode
        this.contact = this.$store.getters.contact(id)
      },
      deleteContact (id) {
        this.deleteMode = !this.deleteMode
        this.contact = this.$store.getters.contact(id)
      },
      toggleAddMode (e) {
        this.addMode = e
      },
      toggleEditMode (e) {
        this.editMode = e
      },
      toggleDeleteMode (e) {
        this.deleteMode = e
      },
    },
  }
</script>
