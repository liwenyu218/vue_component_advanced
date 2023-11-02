<template>
  <div class="alert">
    <div class="alert-item" v-for="item in notices" :key="item.name">
      <div class="alert-content" :class="item.type">
        <span>{{ item.content }}</span>
        <span
          v-if="item.showClose"
          @click.stop="remove(item.name)"
          class="closeBtn"
        >
          x</span
        >
      </div>
    </div>
  </div>
</template>

<script>
let seed = 0;

function getUuid() {
  return "alert_" + seed++;
}

export default {
  data() {
    return {
      notices: [],
      closed: false,
    };
  },

  mounted() {
    document.addEventListener("keydown", this.keydown);
  },

  methods: {
    add(notice) {
      const name = getUuid();
      this.closed = false;

      let _notice = Object.assign(
        {
          name: name,
        },
        notice
      );
      this.notices.push(_notice);

      const duration = notice.duration;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },

    remove(name) {
      if (this.closed) return;
      const notice = this.notices;

      for (let i = 0; i < notice.length; i++) {
        if (this.notices[i].name === name || name === "*") {
          this.notices.splice(i, 1);
          break;
        }
      }

      if (this.notices.length === 0) this.closed = true;
    },

    keydown(e) {
      if (e.keyCode === 27) {
        // esc关闭消息
        this.remove("*");
      }
    },
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  /* pointer-events: none; */
}
.alert-content {
  display: inline-block;
  padding: 10px 25px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}
.success {
  background-color: rgb(234, 246, 236);
  color: rgb(115, 198, 74);
}
.warning {
  background-color: rgb(253, 246, 236);
  color: rgb(232, 162, 60);
}
.closeBtn {
  cursor: pointer;
}
</style>
