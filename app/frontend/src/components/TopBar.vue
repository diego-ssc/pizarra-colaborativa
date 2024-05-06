<script setup lang="ts">
</script>

<template>
  <header style="background-color:#ffffff; padding: 15px;">
    <slot></slot>
    <table>
      <tr>
        <th>
          <img src="../../public/pizarra.png" style="height: 40px; margin-left: 20px; float: left;">
        </th>
        <a href="/">
          <th>
            <img src="../../public/logo.png" alt="Logo de Pizarro" style="height: 40px; align-items:right;">
          </th>
        </a>
      </tr>
    </table>
  </header>
</template>
