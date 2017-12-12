<template>
    <div class="example-avatar">
        <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
            <h3>Drop files to upload</h3>
        </div>
        <div class="avatar-upload"  v-show="!edit">
            <div class="text-center p-2">
                <label for="avatar">
                    <img :src="files.length ? files[0].url : chat.coverUrl"  class="rounded" />
                    <!--<h4 class="pt-2">or<br/>Drop files anywhere to upload</h4>-->
                </label>
            </div>

            <div class="row">
                <div class="col-lg-12 avatar-info">
                    <div>
                        <h6>Click the button or simply drop an image there to change the cover</h6>
                    </div>
                    <div class="p-2">
                        <file-upload
                                extensions="gif,jpg,jpeg,png,webp"
                                accept="image/png,image/gif,image/jpeg,image/webp"
                                name="cover"
                                id="avatar"
                                class="btn btn-secondary"
                                :post-action="`private/chats/cover/${ chat._id }`"
                                :drop="!edit"
                                :headers="{'authorization': token}"
                                v-model="files"
                                @input-filter="inputFilter"
                                @input-file="inputFile"
                                ref="upload">
                            Upload avatar
                        </file-upload>
                    </div>
                </div>
            </div>

        </div>

        <div class="avatar-edit" v-show="files.length && edit">

            <div class="avatar-edit-image" v-if="files.length">
                <img ref="editImage" :src="files[0].url" />
            </div>

            <div class="text-center p-4">
                <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">Cancel</button>
                <button type="submit" class="btn btn-primary" @click.prevent="editSave">Save</button>
                <span v-show="$refs.upload && $refs.upload.uploaded">{{ uploadedHook() }}</span>
            </div>

        </div>
    </div>
</template>

<script>
    //IMPORTED MODULES
    import axios from 'axios';
    import Cropper from 'cropperjs';
    import FileUpload from 'vue-upload-component';
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        props: ['chat'],
        components: {
            FileUpload,
        },
        data() {
            return {
                files: [],
                edit: false,
                cropper: false,
            }
        },
        computed: {
            ...mapGetters({
                token: 'LOCAL_STORAGE_G_GET_TOKEN',
            })
        },
        watch: {
            edit(value) {
                if (value) {
                    this.$nextTick(function () {
                        if (!this.$refs.editImage) {
                            return
                        }
                        let cropper = new Cropper(this.$refs.editImage, {
                            aspectRatio: 1 / 1,
                            viewMode: 1,
                        });
                        this.cropper = cropper
                    })
                } else {
                    if (this.cropper) {
                        this.cropper.destroy();
                        this.cropper = false
                    }
                }
            }
        },
        methods: {
            ...mapMutations({
                setFieldChatList: 'CHATLIST_M_SET_FIELD_OF_CHAT',
                setFieldChatSettings: 'CHAT_SETTINGS_M_SET_FIELD'
            }),
            uploadedHook() {
                if(this.chat._id){
                    axios.get(`/private/chats/${ this.chat._id }`)
                        .then(({ data }) => {
                            this.setFieldChatList({ id: this.chat._id, changes:  { field: 'coverUrl', value: data.coverUrl } });
                            this.setFieldChatSettings({ field: 'coverUrl', value: data.coverUrl })
                        })
                        .catch()
                }
            },
            editSave() {
                this.edit = false;
                let oldFile = this.files[0];
                let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1]);
                let arr = new Uint8Array(binStr.length);
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                let file = new File([arr], oldFile.name, { type: oldFile.type });
                this.$refs.upload.update(oldFile.id, {
                    file,
                    type: file.type,
                    size: file.size,
                    active: true,
                })
            },
            alert(message) {
                alert(message)
            },
            inputFile(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    this.$nextTick(function () {
                        this.edit = true
                    })
                }
                if (!newFile && oldFile) {
                    this.edit = false
                }
            },
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                        this.alert('Your choice is not a picture');
                        return prevent()
                    }
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.url = '';
                    let URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL) {
                        newFile.url = URL.createObjectURL(newFile.file)
                    }
                }
            }
        }
    }
</script>

<style>
    .avatar-info {
        margin: 15px 0 0 0;

        background: rgba(255, 255, 255, 1);

        border: 1px solid rgba(180, 180, 180, 1);
        border-radius: 4px;
    }

    .example-avatar .avatar-upload .rounded {
        width: 200px;
        height: 200px;
    }
    .example-avatar .text-center .btn {
        margin: 0 .5rem
    }
    .example-avatar .avatar-edit-image {
        max-width: 100%
    }
    .example-avatar .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
    }
    .example-avatar .drop-active h3 {
        margin: -.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }
</style>