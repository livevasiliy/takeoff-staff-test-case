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
          <tr v-for="item in filterableContacts" :key="item.id">
            <td>
              <v-avatar color="teal" size="36" class="mr-2">
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
              <v-btn icon @click="toggleEditMode(true)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="toggleDeleteMode(true)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </td>
            <EditContact
                    :edit="editMode"
                    :contact="item"
                    @toggle-edit-mode="toggleEditMode($event)"
            />
            <DeleteContact
                    :deleteMode="deleteMode"
                    :contact="item"
                    @toggle-delete-mode="toggleDeleteMode($event)"
            />
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-main>

    <AddContactButton @toggle-add-mode="toggleAddMode($event)"/>

    <CreateContact :create="addMode" @toggle-add-mode="toggleAddMode($event)"/>

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
    components: {
      CreateContact,
      EditContact,
      DeleteContact,
      AddContactButton,
      Navbar,
      Loader,
      Notification
    },
    mounted () {
      this.$store.dispatch('fetchContacts')
    },
    data: () => ({
      contact: {
        firstName: '',
        lastName: '',
        company: '',
        position: '',
        email: '',
        phone: '',
        notes: '',
      },
      addMode: false,
      editMode: false,
      deleteMode: false,
    }),
    computed: {
      ...mapGetters(['contacts', 'message', 'search']),
      filterableContacts () {
        return this.contacts
        .filter(item => Object.keys(item)
          .some(key => item[key]
          .toString()
          .toLowerCase()
          .includes(this.search.toLowerCase()))
        )
      },
    },
    methods: {
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
